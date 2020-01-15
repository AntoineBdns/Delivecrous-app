import {IonAlert,IonList,IonModal,IonToast,IonItem,IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInput, IonListHeader } from '@ionic/react';
import React, { useState } from 'react';
import  {cart,add,close} from 'ionicons/icons';
import "./Home.css";
import data from "../data.json"
const shopList = data.shopList;

const Home: React.FC = () => {
 
  // function getBeers(){
  //   fetch("https://api.punkapi.com/v2/beers")
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       console.log("API CALL");
  //       setBeerList(result);
  //     },
  //     (error) => {
  //       alert(error);
  //     }
  //   );
  // }
  
  const [showModal, setShowModal] = useState(false);
  const [cartList, setCartList] = useState(new Array<number>());
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [showAlertValidation, setAlertValidation] = useState(false);
  const [showToastValidation, setShowToastValidation] = useState(false);
  //const [beerList, setBeerList] = useState(new Array());
  
  // if(beerList.length <= 0)
  //   getBeers();

  function addItemToCart(id : number){
    cartList.push(id);
    setShowToastAdd(true);
  }

  function validateForm(){
    setAlertValidation(true);
  }

  //Affiche les cards des shops sur la page principale
  var shopCards = shopList.map((shop) => {
    return (<IonCard className="card">
      <img src= {shop.img} alt={shop.name} />
      <IonCardHeader>
        <IonCardTitle className="title">{shop.name}</IonCardTitle>
        <IonCardSubtitle className="price">{shop.price}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="content">
        {shop.desc}
        <IonButton expand="block" slot="end" onClick={ () => addItemToCart(shop.id)}>
            Ajouter
        </IonButton>
      </IonCardContent>    
    </IonCard>
    )
  });

  // var beerCarts = beerList.map((beer : any)=>{
  //   return (<IonCard className="card">
  //     <img src= {beer.image_url} alt={beer.name} />
  //     <IonCardHeader>
  //       <IonCardTitle className="title">{beer.name}</IonCardTitle>
  //       <IonCardSubtitle className="price">{beer.id}</IonCardSubtitle>
  //     </IonCardHeader>
  //     <IonCardContent className="content">
  //       {beer.description}
  //       <IonButton expand="block" slot="end" onClick={ () => addItemToCart(beer.id)}>
  //           Ajouter
  //       </IonButton>
  //     </IonCardContent>    
  //   </IonCard>
  //   )
  // });

  //Affiche la liste des items dans le pannier
  var cartCards = cartList.map((id : number) => {
    var name = null;
    var price = null;
    shopList.forEach((s) => {
      if(s.id == id){
         name = s.name;
         price = s.price;
      }
    });
    return (
      <IonItem className="cartItem">
        <IonLabel className="name">{name}</IonLabel>
        <IonLabel className="price">{price}</IonLabel>
      </IonItem>
    )
  });

  //Affiche le contenu da la page
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Delivecrous</IonTitle>
          <IonButton slot="end" onClick={() => setShowModal(true)}>
              <IonIcon slot="icon-only" icon={cart}/>
          </IonButton>
        </IonToolbar>
      </IonHeader>   
      <IonContent className="ion-padding">
        <IonLabel><h1>La carte</h1></IonLabel>
        {/*
        beerCarts
        */
        shopCards
        }
        <IonModal isOpen={showModal}>
          <IonToolbar>
            <IonTitle>Pannier</IonTitle>
            <IonButton slot="end" onClick={() => setShowModal(false)}>
                <IonIcon slot="icon-only" icon={close}/>
            </IonButton>
          </IonToolbar>
          <IonContent>
            <IonCard>
              <IonList>
                <IonListHeader>Liste des produits</IonListHeader>
                {
                (cartList.length>0)? cartCards : 
                  <IonItem><IonLabel className="emptyCartMessage">Votre Pannier est vide</IonLabel></IonItem>
                }
              </IonList>
            </IonCard>
            <IonCard>
              <IonCardHeader>Livraison</IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Rue</IonLabel>
                  <IonInput type="text" placeholder="Rue de la Victoire"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Ville</IonLabel>
                  <IonInput type="text" placeholder="Valenciennes"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Code Postal</IonLabel>
                  <IonInput type="number" placeholder="59300"></IonInput>
                </IonItem>
                <IonButton expand="block" disabled={cartList.length<=0} onClick={() => validateForm()}>
                    Passer Commande
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonContent>      
        </IonModal>
      </IonContent>
      <IonToast
        isOpen={showToastAdd}
        onDidDismiss={() => setShowToastAdd(false)}
        message="C'est good"
        cssClass="toastMessage"
        position="bottom"
        duration={500}
      />
      <IonToast
        isOpen={showToastValidation}
        onDidDismiss={() => setShowToastValidation(false)}
        message="Commande envoyée"
        cssClass="toastMessage"
        position="bottom"
        duration={1000}
      />
      <IonAlert
          isOpen={showAlertValidation}
          onDidDismiss={() => setAlertValidation(false)}
          header={'Validation de la commande'}
          message={'Voulez vous vraiement valider cette commande ?'}
          buttons={[
            {
              text: 'Retour',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Valider',
              handler: () => {
                setCartList(new Array());
                setShowToastValidation(true);
              }
            }
          ]}
        />
    </IonPage>
  );
};

export default Home;
