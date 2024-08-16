import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About=()=>{
    return (
        <>
         <Navbar/>
         <div style={{background : "#fed8b1", minHeight:"100vh"}} className="p-5 text-justify text-black">
                <h4 className="mb-3 text-decoration-underline">
                ABOUT US
                </h4>
                <p>
                    Welcome to BITEBLISS, where every meal is a celebration of flavor and happiness.
                </p>
                <p>
                Founded with a passion for culinary excellence, our restaurant is a haven for food enthusiasts who seek an unforgettable dining experience. At BITEBLISS, we believe in the joy of savoring every bite, and we are dedicated to bringing you dishes that are not only delicious but also crafted with love and care.
                </p> 
                <p>
                Our menu is a fusion of classic favorites and innovative creations, carefully curated to delight your taste buds. From farm-fresh ingredients to exquisite plating, every aspect of our food reflects our commitment to quality and taste. Whether you're here for a quick bite, a leisurely meal, or a special occasion, we promise to make it memorable.
                </p>
                <p>
                At BITEBLISS, it's not just about food—it's about creating blissful moments. Come join us and experience the magic of a meal well done.
                </p>
                <h4 className="mb-3 text-decoration-underline">
                CONTACT US
                </h4>
                <p>
                Name : Akash Kumar Tiwary
                </p>
                <p>
                Email : 1akashtiwary@gmail.com
                </p>
                <p>
                Phone : +91-7070489408
                </p>
                <p>
                Address : BIT Mesra, Ranchi, Jharkhand - 835215
                </p>
                
           </div> 
        <Footer/>
        </>
        )
}
export default About;