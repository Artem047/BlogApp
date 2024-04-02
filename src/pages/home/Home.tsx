import { useAuth } from "../../context/AuthContext"

const Home = () => {
  const { posts, handleDeletePost } = useAuth()
  return (
    <div>{posts.map((post) => {
      return (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <span>{post.currentUser}</span>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      )
    })}</div>
  )
}

export default Home