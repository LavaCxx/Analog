export const useNav=()=>{
    return useState('navList',()=>(
        [
            {
              title: "Home",
              link: "/",
            },
            {
              title: "Post",
              link: "/posts",
            },
            {
              title: "Toy",
              link: "/toys",
            },
            {
              title: "Friend",
              link: "/friend",
            },
            {
              title: "About",
              link: "/about",
            },
          ]
    ))
}