import React, { useContext, useState, useEffect } from 'react' 
import SEO from "../components/seo"
import { graphql } from "gatsby"
import StoreContext from '../context/store'
import ProductBox from "../components/productBox"
const IndexPage = ({data}) => {
  const { edges: products } = data.allShopifyProduct

  const context = useContext(StoreContext);
  const [type, setType] = useState(context.filteredType)
  const [sort, setSort] = useState(context.filteredSort)


  useEffect(() => {
    context.updateFilterType(type)
    console.log("type",type)
  }, type)

  useEffect(() => {
    context.updateFilterSort(sort)
    console.log("sort",sort)
  }, sort)

  const sorts = []

  sorts.push(
    <>
      <option key={0} value="Featured">
        Featured
      </option>
      <option key={1} value="A-Z">
        Alphabetically, A-Z
      </option>
      <option key={2} value="Z-A">
        Alphabetically, Z-A
      </option>
      <option key={3} value="low">
        Price, low to high
      </option>
      <option key={4} value="high">
        Price, high to low
      </option>
    </>
  )
  const productTypes = []
  const types = []
  types.push(
    <option value="all" key="-1">
      All
    </option>
  )
  products.map((t, i) => {
    let type = t.node.productType
    if (!productTypes.includes(type) && type.length > 0) {
      productTypes.push(type)
      types.push(
        <option key={i} value={type}>
          {type}
        </option>
      )
    }
    return null
  })
  productTypes.sort()

  return(
    <>
    <SEO title="Home" />
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-8">
                <label className="has-text-weight-semibold is-uppercase" style={{margin:"-20px"}}>SORT BY :</label>
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        id="productSort"
                        defaultvalues={sort}
                        onChange={e => setSort(e.target.value)}
                      >
                        {sorts}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <label className="has-text-weight-semibold is-uppercase" style={{margin:"-20px"}}>FILTER BY :</label>
                <div className="field">
                  <div className="control">
                  <div className="select">
                      <select
                        id="productFilter"
                        defaultvalues={type}
                        onChange={e => setType(e.target.value)}
                      >
                        {types}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns is-multiline ">
              {
                context.filteredType === 'all'
                  ? products.map((p, i) => {
                    let product = p
                    return (
                      <div className="column is-3" style={{ marginBottom: "40px" }} key={i}>
                        <ProductBox product={product} />
                      </div>
                    )
                  })
                  : products
                    .filter(p => p.node.productType.includes(context.filteredType))
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
  </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allShopifyProduct {
      edges {
        node {
          id
          title
          handle
          productType
          vendor
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 910) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          variants {
            id
            title
            price
          }
        }
      }
    }
  }
`
