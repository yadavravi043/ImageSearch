import { useState, useEffect } from "react"
import Article from "./Article"
export default function GetImages() {
  const [images, setImages] = useState([])
  const [searchValue, setSearchValue] = useState('developer')

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
        // `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      )
      console.log(response)
      const data = await response.json()
      setImages(data.results)
    }

    fetchImages()
  }, [searchValue])
  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
   }
  return (
    <>
      <div className="container mx-auto px-5 2xl:px-0">
        <h1 className="text-slate-800 font-bold text-3xl md:text-4xl lg:text-6xl my-10 lg:mt-20 lg:mb-14">
        Tars Fullstack Engineer Internship Coding Challenge
        </h1>
        <h1>Search your Images</h1>
        <div className="flex" style={{margin:"20px"}}>
        <input
          className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl"
          type="search"
          placeholder="Search images as you want"
          value={searchValue}
          onChange={handleInputChange}
          />
       {/* <button
          onClick={""}
          disabled={""}
          className="bg-blue-600 px-6 py-2.5 text-white rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
        >Search</button>
      */}
      </div>
        {!images ? (
          <div>
          <h1>Loading...</h1>
          </div>
          ) : (
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 pb-20 lg:container">
            {images.map((image) => (
              <Article key={image.id} {...image} />
              ))}
              </section>
              )}   
      </div>
    </>
  )
}
