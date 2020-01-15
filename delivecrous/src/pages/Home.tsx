import {IonModal,IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonCheckbox } from '@ionic/react';
import React, { useState } from 'react';
import  {cart,add,close} from 'ionicons/icons';
import "./Home.css";
import data from "../data.json"
const shopList = data.shopList;
const Home: React.FC = () => {
  var itemList = [];
  
  const [showModal, setShowModal] = useState(false);

  var shopCards = shopList.map((shop) => {
    return (<IonCard className="card">
      <img src= {shop.img} />
      <IonCardHeader>
        <IonCardTitle className="title">{shop.name}</IonCardTitle>
        <IonCardSubtitle className="price">{shop.price}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent className="content">
        {shop.desc}
      </IonCardContent>
    </IonCard>
    )
  });

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
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton disabled={itemList.length<=0}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal}>
          <IonToolbar>
            <IonTitle>Delivecrous</IonTitle>
            <IonButton slot="end" onClick={() => setShowModal(false)}>
                <IonIcon slot="icon-only" icon={close}/>
            </IonButton>
          </IonToolbar>
          <IonContent>
            <p>This is modal content</p>
          </IonContent>      
        </IonModal>
      </IonContent>
    </IonPage>

    
  );
};

export default Home;
