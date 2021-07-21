import React, {useContext} from 'react';
import ProductBox from "./ProductList/productBox"
import Sort from "./Filter/sort"
import Collection from './Filter/collection';
import StoreContext from '../context/store'

const ProductList = ({ data }) => {
  const { edges: products } = data.allShopifyProduct
  const context = useContext(StoreContext);


  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile" style={{ marginBottom: "60px", margin: "0", padding: "10px" }}>
            <div className="column is-2-desktop is-6-mobile">
              <Sort context={context} />
            </div>
            <div className="column is-2-desktop is-6-mobile">
              <Collection context={context} products={products} />
            </div>
          </div>
          <div className="columns is-multiline" style={{ margin: "0" }}>
            {
              products
                .filter(p => context.filteredType === 'all' ? p : (p.node.productType.includes(context.filteredType)))
                .sort(
                  context.filteredSort === "featured" ? (a) => (a)
                    : context.filteredSort === "low" ? ((a, b) => a.node.variants[0].price - b.node.variants[0].price)
                      : context.filteredSort === "high" ? ((a, b) => b.node.variants[0].price - a.node.variants[0].price)
                        : context.filteredSort === "Z-A" ? ((a, b) => b.node.title.localeCompare(a.node.title))
                          : context.filteredSort === "A-Z" ? ((a, b) => a.node.title.localeCompare(b.node.title)) : null
                )
                .map((p, i) => {
                  let product = p
                  return (
                    <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                      <ProductBox product={product} />
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;