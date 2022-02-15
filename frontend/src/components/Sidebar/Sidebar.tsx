import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { scrollToTop } from '../../Assets/Helpers/Scroll';
import { MovieGenre } from '../../Interfaces/MovieType';
import styles from './Sidebar.module.css'

interface SidebarProps {
  title: String;
  sideBarPages: MovieGenre[];
  name: String;
}

const Sidebar = ({ title, sideBarPages, name }: SidebarProps) => {
  const navigate = useNavigate();
  const { genre } = useParams()

  const OnSideBarPageClick = (id?: Number) => {
    scrollToTop();
    if (typeof id != "undefined" && id > 0) {
      navigate(`/${name}/genre/${id}`)
      navigate(0);
      return
    }
    navigate(`/${name}`)
    navigate(0);
  }

  return (
    <div className={styles.sideBarContainer}>
      <h1 className={styles.sideBarTitle} onClick={() => OnSideBarPageClick()}>{title}</h1>
      {
        sideBarPages.map((page, index) => {
          return (
            <h5
              className={styles.sideBarPageName}
              key={index}
              style={
                {
                  color: (Number(genre) === page.id
                    || page.id < 0 && genre == undefined) ? "yellow" : "white",
                }
              }
              onClick={() => OnSideBarPageClick(page.id)}>
              {page.name}
            </h5>
          )
        })
      }
    </div>
  )
}

export default Sidebar;