
import Nav from './navbar/Nav'
import {createSignal} from 'solid-js'
import ArticleList from './main/ArticleList'
import FlapDisplay from '../components/widgets/flap/FlipDisplay'
import { Router, Route, Routes } from "@solidjs/router"
import BlogMain from '../components/BlogMain'
import Test from '../components/main/Test'
interface NavItem {
    title: string
    link: string
}
export default () => {
    const navList: NavItem[] = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Posts',
            link: '/posts'
        },
        {
            title: 'About',
            link: '/about'
        },
        {
            title: 'Test',
            link: '/test'
        }
    ]
    const [currentUrl, setCurrentUrl] = createSignal('/')
    return (
        <Router>
        <div class="mx-a h-screen max-w-6xl grid grid-cols-[250px_auto]">
            <div class="flex flex-col justify-center h-screen ">
                <FlapDisplay value={'hello'} />
                {currentUrl()}
                <Nav list={navList} change={(val)=>setCurrentUrl(()=>val)} />
            </div>
            <div class="w-full h-screen bg-primary">
                    <Routes>
                        <Route path="/" component={ArticleList} /> {/* 👈 Define the home page route */}
                        <Route path="/test" component={Test} /> {/* 👈 Define the home page route */}
                    </Routes>
            </div>
        </div>
        </Router>
    )
}
