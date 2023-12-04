import styled from 'styled-components';
import henri from "../images/henri.webp";
import barista from "../images/barista.avif";
import bruloir from "../images/bruloir.avif";
// ... (other imports)

const Recipes = () => {
    


    return (
        <RecipesPage>
            <h1>Local Roasters</h1>
            <Card>
                
                <Roaster>
                    <Info>
                    <h2>Saint-Henri micro-torréfacteur</h2>
                    <p>Saint-Henri micro-torréfacteur is one of the first coffee roasters in Montréal. It roasts and serves coffee and sustenance to its legion of fans at its state-of-the-art headquarters in the Mile-Ex or at any of its 8 coffee shops. It also offers several courses, from home coffee making to more professional ones.</p>
                    <h3>Location:</h3>
                    <p>3662 Notre-Dame Street West (and other locations)</p>
                    <a href="https://sainthenri.ca/">Their Website</a>
                    </Info>
                    <div>
                    <img src = {henri} />
                    </div>
                </Roaster>
                <Roaster>
                    <Info>
                    <h2>Le Brûloir</h2>
                    <p>Le Brûloir has been around for almost a decade now. Its Ahuntsic roasting “Labo” strives to roast the best beans, which it serves at its two charming cafés as well as at quite a few spots around town, such as Café Bloom, Pâtisserie Bicyclette, Arhoma and more. Keep an eye on its social media channels for its cupping events. You can purchase its coffee from its website. Le Brûloir delivers for free in Laval and certain Montréal neighbourhoods.</p>
                    <h3>Location:</h3>
                    <p>318 Fleury Street West and 8485 Saint-Laurent Blvd.</p>
                    <a href="https://www.lebruloir.com/">Their Website</a>
                    </Info>
                    <div>
                    <img src = {bruloir} />
                    </div>
                </Roaster>
                <Roaster>
                    <Info>
                    <h2>Barista</h2>
                    <p>If you’re a café aficionado in Montréal, you’ve probably already tasted Barista’s roasted beans. It specializes in white label, 100% custom made blends designed for specific cafés. Barista also has a café of its own in Ahuntsic. You can purchase Barista beans, coffee subscriptions or a coffee course at the National Barista Institute.</p>
                    <h3>Location:</h3>
                    <p>111A de Louvain Street</p>
                    <a href="https://cafebarista.ca/en/">Their Website</a>
                    </Info>
                    <div>
                    <Barista src = {barista} />
                    </div>
                </Roaster>

            </Card>
        </RecipesPage>
    );
};


const Barista = styled.img`
background-color: black;
padding: 5px;
border-radius: 10px;
max-width: 200px;

`

const Info = styled.div`
display: flex;
flex-direction: column;
max-width: 500px;

`

const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 50px;
`
const RecipesPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
h1{
  text-align: center;
}
`

const Roaster = styled.div`
display: flex;
flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(255, 255, 240, 0.9);
  width: 60vw;
  margin-right: 30px;
  padding-left: 50px;
  padding-bottom: 20px;
  padding-right: 50px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  h2 {
    font-size: 2em;
  }
  p {
    font-size: 1em;
    margin-right: 10px;
  }
  h3 {
    font-size: 1.25em;
  }
  Link {
    font-size: 1.25em;
  }
  img{
    margin: 20px;
    }
`


export default Recipes;