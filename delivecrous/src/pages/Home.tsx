import {IonModal,IonToast,IonItem,IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonCheckbox } from '@ionic/react';
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

  //Affiche la liste des shops dans le pannier
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
      <IonCard className="card">
        <IonCardHeader>
          <IonCardTitle className="title">{name}</IonCardTitle>
          <IonCardSubtitle className="price">{price}</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
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
            {cartCards}
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
