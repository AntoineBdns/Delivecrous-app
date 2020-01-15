import {IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import React from 'react';
import  {cart} from 'ionicons/icons';
import "./Home.css";
import data from "../data.json"
const shopList = data.shopList;
const Home: React.FC = () => {
  
  var shopCards = shopList.map((shop) => {
    return (<IonCard className="card">
      <img src= {shop.img} alt=""/>
      <IonCardHeader>
        <IonCardTitle className="title">{shop.name}</IonCardTitle>
        <IonCardSubtitle className="price">{shop.price}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="content">{shop.desc}</IonCardContent>
    </IonCard>
    )
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Delivecrous</IonTitle>
          <IonButton slot="end">
              <IonIcon slot="icon-only" icon={cart}/>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonLabel><h1>La carte</h1></IonLabel>
        {shopCards}

      </IonContent>
    </IonPage>
  );
};

export default Home;
