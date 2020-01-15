import {IonList,IonModal,IonToast,IonItem,IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonCheckbox, IonInput, IonListHeader } from '@ionic/react';
import React, { useState } from 'react';
import  {cart,add,close} from 'ionicons/icons';
import "./Home.css";
import data from "../data.json"
const shopList = data.shopList;
const Home: React.FC = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [cartList, setCartList] = useState(new Array());
  const [showToastAdd, setShowToastAdd] = useState(false);

  function addItemToCart(id : number){
    cartList.push(id);
    setShowToastAdd(true);
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

  //Affiche la liste des items dans le pannier
  var cartCards = cartList.map((id : number) => {
    var name = null;
    var price = null;
    shopList.map((s) => {
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
        {shopCards}
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
                <IonButton expand="block" disabled={cartList.length<=0}>
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
    </IonPage>
  );
};

export default Home;
