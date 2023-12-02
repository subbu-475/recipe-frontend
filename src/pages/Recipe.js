import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../config/global';
import {Carousel} from 'react-bootstrap';

function Recipe() {
    const [recipe,setRecipe]=useState({});
    const {id}=useParams();
    useEffect(()=>{
        const getRecipe=async (id)=>{
            try{
                const response = await axios.get(`${API_URL}/recipies/${id}`);
                if(response.data==="no recipe found"){
                    alert("no recipe found")
                }
                else if(response.data==="server busy"){
                    alert("server busy")
                }
                else{
                    setRecipe(response.data);
                }
            }
            catch (err){
                console.error("error is",err);
            }
        }

        getRecipe(id);
    },[id])
  return (
    <>
        <h1 style={{'color':'#F9A620','marginLeft':'10%','textAlign':'left','marginTop':'20px'}}>Recipe</h1>
        <div className="container-fluid backgroundrecipe-img">
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid recipe-margin" id="product_image">
                    {recipe.image && (
                            <Carousel pause="hover">
                                <Carousel.Item>
                                    <img src={recipe.image} alt="sdf"  width="100%" className="recipe-img"/>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={recipe.image} alt="sdf"  width="100%" className="recipe-img"/>
                                </Carousel.Item>
                                {/* Add more Carousel.Items if needed */}
                            </Carousel>
                            )}
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3 style={{'color':'#104911'}}>{recipe.recipename}</h3>
                    <p id="product_id">Added on: Date {new Date(recipe.addon).getUTCDate()}-{new Date(recipe.addon).getUTCMonth()}-{new Date(recipe.addon).getUTCFullYear()} {new Date(recipe.addon).getUTCHours()} hrs {new Date(recipe.addon).getUTCMinutes()} mins</p>

                    <hr/>

                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <span id="no_of_reviews">(❤️ {recipe.likes} likes)</span>

                    <hr/>
                    <h4 className='individual-recipe-heading'>Categories</h4>
                    <div className="stockCounter d-inline">
                        <h6>Cuisine : <span style={{fontWeight:"lighter"}}>{recipe.cuisine}</span></h6>
                        <h6>Course : <span style={{fontWeight:"lighter"}}>{recipe.course}</span></h6>
                        <h6>Diet : <span style={{fontWeight:"lighter"}}>{recipe.diet}</span></h6>
                    </div>

                    <hr/>
                    <h4 className='individual-recipe-heading'>Duration</h4>
                    <h6>Preparation Time : <span  style={{fontWeight:"lighter"}}>{recipe.preptime} <strong>mins</strong></span></h6>
                    <h6>Cook Time : <span style={{fontWeight:"lighter"}}>{recipe.cooktime} <strong>mins</strong></span></h6>
                    <h6>Total Time : <span style={{fontWeight:"lighter"}}>{recipe.totaltime} <strong>mins</strong></span></h6>

                    <hr/>

                    <h4 className="mt-2 individual-recipe-heading">Ingredients</h4>
                    <ol>
                        {recipe.ingredients && recipe.ingredients.split(',').map((ingredient)=><li>{ingredient}</li>)}
                    </ol>

                    <hr/>

                    <h4 className="mt-2" style={{'color':'#104911','fontSize':'600'}}>Instructions</h4>
                    <ol>
                    {recipe.instructions && recipe.instructions.split('.').map((instruction)=>
                        <>
                            <li>{instruction}</li>
                        </>
                        
                    )}
                    </ol>

                    <hr/>

                    <p id="product_seller mb-3">Owner : <strong>{recipe.owner}</strong></p>
                    
                    <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your comments
                    </button>
                    
                    <div className="row mt-2 mb-5">
                        <div className="rating w-50">

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            <ul className="stars" >
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                                <li className="star"><i className="fa fa-star"></i></li>
                                            </ul>

                                            <textarea name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                            
                </div>

            </div>

        </div>
    </>
  )
}

export default Recipe;