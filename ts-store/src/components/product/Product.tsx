import { useDataContext } from '../../context/DataProvider'

export const Product = () => {

  const {user}=useDataContext()

  return (
    <div className="Products">
      <h2>Products</h2>
      {user && (
        <div className="product">
          <img src={user.avatar} style={{width: "50px"}}/>
          <div>{user.email}</div>
        </div>
      )}
    </div>
  )
}
