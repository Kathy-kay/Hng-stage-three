"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SearchBar from "./SearchBar";

const GetImages = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "DEFAULT") {
      const reorderdImages = [...images];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImages] = reorderdImages.splice(sourceIndex, 1);
      reorderdImages.splice(destinationIndex, 0, removedImages);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=1&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }
      const data = await response.json();
      const searchResults = data.results || []; // Ensure searchResults is an array
      setImages(searchResults);
      setQuery("");
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-container">
      <DragDropContext onDragEnd={handleDragDrop}>
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Droppable droppableId="ROOT">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="list"
              >
                {images.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="image-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <Image
                          src={item.urls.full}
                          alt={item.user.name}
                          loading="lazy"
                          width={300}
                          height={400}
                          style={{
                            objectFit: "cover",
                            marginBottom: "30px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

export default GetImages;
