import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cloudinaryImages } from '../../../config/cloudinary';
import galleryBg from '../../../assets/img/bg/new-bg.png';
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/8bit/pagination';
import './Gallery.css';

const img1 = cloudinaryImages.gallery.c1;
const img2 = cloudinaryImages.gallery.c2;
const img3 = cloudinaryImages.gallery.c3;
const img4 = cloudinaryImages.gallery.c4;
const img5 = cloudinaryImages.gallery.c5;
const img6 = cloudinaryImages.gallery.c6;
const img7 = cloudinaryImages.gallery.c7;
const img8 = cloudinaryImages.gallery.c8;
const img9 = cloudinaryImages.gallery.c9;
const img10 = cloudinaryImages.gallery.c10;
const img11 = cloudinaryImages.gallery.c11;
const img12 = cloudinaryImages.gallery.c12;
const img13 = cloudinaryImages.gallery.c13;
const img14 = cloudinaryImages.gallery.c14;

const galleryImgs = [
  { id: '1', thumb: img1 },
  { id: '2', thumb: img2 },
  { id: '3', thumb: img3 },
  { id: '4', thumb: img4 },
  { id: '5', thumb: img5 },
  { id: '6', thumb: img6 },
  { id: '7', thumb: img7 },
  { id: '8', thumb: img8 },
  { id: '9', thumb: img9 },
  { id: '10', thumb: img10 },
  { id: '11', thumb: img11 },
  { id: '12', thumb: img12 },
  { id: '13', thumb: img13 },
  { id: '14', thumb: img14 },
];

const ITEMS_PER_PAGE = 12; /* 4 columns x 3 rows */

const getPageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  if (currentPage > 3) pages.push('ellipsis-left');
  if (currentPage > 1 && currentPage < totalPages) pages.push(currentPage);
  if (currentPage < totalPages - 2) pages.push('ellipsis-right');
  if (totalPages > 1) pages.push(totalPages);
  return pages;
};

const TOAST_AUTO_DISMISS_MS = 5000;

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [toastImage, setToastImage] = useState(null);

  const totalPages = Math.ceil(galleryImgs.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return galleryImgs.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const pageNumbers = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  useEffect(() => {
    if (!toastImage) return;
    const t = setTimeout(() => setToastImage(null), TOAST_AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [toastImage]);

  const handleImageClick = (e, thumb) => {
    e.preventDefault();
    setToastImage(thumb);
  };

  return (
    <React.Fragment>
      <div className="gallery-hero-wrap">
        <div
          className="gallery-hero-video"
          style={{ backgroundImage: `url(${galleryBg})` }}
          aria-hidden="true"
        />
        <div className="gallery-hero-overlay">
          <section className="breadcrumb-area d-flex align-items-center gallery-breadcrumb">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-12 col-lg-12">
                  <div className="breadcrumb-wrap text-left">
                    <div className="breadcrumb-title">
                      <h2>Gallery</h2>
                      <div className="breadcrumb-wrap">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Gallery</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="work" className="pt-40 gallery-work-section">
            <div className="container">
              <div className="row align-items-center mb-30">
                <div className="col-lg-12">
                  <SectionTitle titlefirst="Glimpses of" titleSec="last year" className="gallery-heading-title" />
                </div>
              </div>
              <div className="portfolio gallery-retro">
                <div className="grid col4 gallery-grid-4x3">
                  {paginatedItems.map((data) => {
                    const { id, thumb } = data;
                    return (
                      <div className="grid-item p-relative" key={id}>
                        <div className="box">
                          <a
                            href={thumb}
                            className="popup-image gallery-image-trigger"
                            onClick={(e) => handleImageClick(e, thumb)}
                          >
                            <img src={thumb} alt="Gallery" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div className="gallery-pagination-wrap">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage <= 1}
                          />
                        </PaginationItem>
                        {pageNumbers.map((page, idx) => {
                          if (page === 'ellipsis-left' || page === 'ellipsis-right') {
                            return (
                              <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage >= totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      {toastImage && (
        <div
          className="gallery-toast-overlay"
          onClick={() => setToastImage(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setToastImage(null)}
          aria-label="Close image"
        >
          <div className="gallery-toast" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="gallery-toast-close"
              onClick={() => setToastImage(null)}
              aria-label="Close"
            >
              <i className="fas fa-times" />
            </button>
            <img src={toastImage} alt="Gallery preview" className="gallery-toast-img" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Gallery;
