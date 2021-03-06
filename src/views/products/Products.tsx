import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../actions/products";
import { AppState } from "../../reducers/rootReducer";
import { ProductState } from "../../reducers/modules/productReducer";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

function Products() {
  const dispatch = useDispatch();

  const { products } = useSelector<AppState, ProductState>(
    (state) => state.product
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        await dispatch(fetchAllProducts());
        setIsLoading(false);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchAPIs();
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            {products &&
              products.map((product) => (
                <div key={product._id} className="col-lg-2 col-md-3 col-sm-6 d-flex-center">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
