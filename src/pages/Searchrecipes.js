import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config/global';
import { useParams } from 'react-router-dom';
import Card from '../partilals/Card';
import Loader from '../partilals/Loader';
import Paginate from '../partilals/Pagination';

function Searchrecipes() {
    const {keyword} = useParams();
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const[currentPage,setCurrentPage]=useState(1);
    const [resPerPage,setResPerPage]=useState(15);
    const [recipeCount,setRecipeCount]=useState(0);
    useEffect(()=>{
        const getSearchRecipies = async() =>{
        if (keyword!==""){
          try{
            const recipies= await axios.get(`${API_URL}/recipies?keyword=${keyword}&$page=${currentPage}`)
            const recipeArray = recipies.data.recipes;
            setData(recipeArray);
            setRecipeCount(recipies.data.recipesCount)
            setLoading(false);
          }
          catch(err){
            alert(err)
          }
          
        }
        else{
          setData([]);
          setLoading(false)
        }
        }
        getSearchRecipies();
    },[keyword])

    const totalRecipesCount = recipeCount;
    const lastIndexInPage = currentPage*resPerPage;
    const firstIndexPerPage = lastIndexInPage - resPerPage;
  return (
    <>
      {loading?(<Loader/>):(
        <>
          <h2 className="pb-2 border-bottom">Searched Recipies</h2>
          <div className='width-height'>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {data.map((recipe)=>
                <Card 
                id={recipe._id}
                name={recipe.recipename}
                key={recipe._id}
                image={recipe.image}
                />
              )}
            </div>
          </div>
        </>)
      }
      {totalRecipesCount>resPerPage?
      <Paginate 
        totalRecipesCount={totalRecipesCount}
        lastIndexInPage={lastIndexInPage}
        firstIndexPerPage={firstIndexPerPage}
        setCurrentPage={setCurrentPage}
        resPerPage={resPerPage}
        currentPage={currentPage}
      />:null
      }
    </>
  )
}

export default Searchrecipes;