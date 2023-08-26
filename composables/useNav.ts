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
              title: "Memo",
              link: "/memos",
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