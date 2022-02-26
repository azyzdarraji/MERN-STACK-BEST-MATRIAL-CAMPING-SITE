import React , {Fragment , useEffect } from "react" 
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css";
import {useSelector ,useDispatch} from "react-redux";
import {clearErrors, getProductDetails} from "../../redux/actions/productActions" ;
import ReviewCard from "./ReviewCard.js" ;
import Loader from "../../component/layout/Loader/Loader"
import {useAlert} from "react-alert" ;
import ReactStars from  "react-rating-stars-component"; 
import MetaData from "../layout/MetaData";





const ProductDetails=({match})=>{
    
  const dispatch = useDispatch();
  const alert=useAlert();

  const {product,loading,error}=useSelector((state)=>state.productDetails)
   
  useEffect(()=>{
       if (error){
         alert.error(error);
         dispatch(clearErrors())
       }
    dispatch(getProductDetails(match.params.id));

  },[dispatch,match.params.id,error,alert])


  const options={
    edit : false ,
    color :"rgba(20,20,20,0.1)",
    activeColor:"tomate" ,
    size: window.innerWidth <600 ? 20 : 25,
    value:product.ratings,
    isHalf:true
  }

  return (
     <Fragment>
       {
         loading ? <Loader/> :(
          <Fragment>
          <MetaData title={`${product.name} --- Prems `} />
          <div className="ProductDetails">
  
             <Carousel>
               {
                 product.images && product.images.map((item,i)=>{
                   <img className="CarouselImage"  
                     key={item.url} 
                     src={item.url}
                     alt={`${i} Slide`}
  
                     />
                 })
               }
             </Carousel>
          
  
          <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p> Product # {product._id} </p>
              </div>
  
              <div className="detailsBlock-2">
                 <ReactStars {...options} />
                 <span>({product.numOfReviews} Reviews )</span>
              </div>
  
              <div className="detailsBlock-3">
                 <h1>{  `${product.price} DT `} </h1>
                 <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                         <button> - </button>
                         <input  value="1" type="number"  />
                         <button> + </button>
                     </div> {" "}
                     <button> Add To Cart </button>
                 </div>
  
                 <p>
                   Status:{" "}
                   <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                     {product.Stock <1 ? "OutOfStock":"InStock" }
                     </b>  
                 </p>
              </div>
  
              <div className="detailsBlock-4">
                 Description :<p> 
                   {product.description}
                 </p>
              </div>
               
               <button className="submitReview"> Submit Review  </button>
  
          </div>
        </div>
  
        <h3 className="reviewsHeading"> Reviews  </h3>
  
        {
          product.reviews && product.reviews[0] ? (
                
            <div className="reviews">
               { product.reviews && 
                   product.map((review)=> <ReviewCard  review={review}/>) }
            </div> ) : ( 
              <p className="noReviews"> No Reviews Yet </p>
            )}
        </Fragment>
         )

       }
     </Fragment>
  )
}

export default ProductDetails ;