/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { type FileWithPreview } from "@/types"
import { unsplash } from "@/utils/unsplash-api"

import { DEFAULT_IMG_QUERY, UNSPLASH_URL } from "@/config/images"

import ImagesGrid from "./ImagesGrid"
import InfiniteWrapper from "./InfiniteWrapper"
import SearchForm from "./SearchForm"

export interface Photo extends FileWithPreview {
  id: string
  urls: { regular: string }
}

const Images = () => {
  const [images, setImages] = useState<Photo[]>([])
  const [currQuery, setCurrQuery] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [queryReset, setQueryReset] = useState<boolean>(false)

  const fetchImages = async () => {
    try {
      setPage((prev) => prev + 1)

      const photos = await unsplash.search.getPhotos({
        query: currQuery || DEFAULT_IMG_QUERY,
        page,
      })
      const result = photos.response?.results as Photo[] | []
      setImages(
        (currQuery && currQuery === query) || queryReset
          ? result
          : [...images, ...result]
      )

      query && setQuery("")
      queryReset && setQueryReset(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (query && query !== currQuery) {
      setPage(1)
      setCurrQuery(query)
    }
    if (!query && !currQuery) {
      void fetchImages()
    }
  }, [query])

  useEffect(() => {
    if (currQuery === query) {
      document.getElementById("imageGrid")?.scrollTo(0, 0)
      void fetchImages()
    }
  }, [currQuery])

  useEffect(() => {
    if (queryReset) {
      setCurrQuery("")
      setPage(1)
    }
  }, [queryReset])

  return (
    <>
      <div className="w-full space-y-3 bg-white p-4">
        <SearchForm setSearch={setQuery} setQueryReset={setQueryReset} />
        <p className="text-base text-muted-foreground">
          View more on <Link href={UNSPLASH_URL}>Unsplash</Link>
        </p>
      </div>
      <div id="imageGrid" className="relative h-full overflow-y-auto p-4">
        {!images?.length ? (
          notFound()
        ) : (
          <>
            <InfiniteWrapper
              fetchItems={fetchImages}
              count={images?.length || 10}
            >
              <ImagesGrid images={images} />
            </InfiniteWrapper>
          </>
        )}
      </div>
    </>
  )
}

export default Images
