import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonImg, IonText, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './ItemPage.css';


interface ItemPageProps extends RouteComponentProps<{
    id: string,
    beer: any
}> {}

const ItemPage: React.FC<ItemPageProps> = ({location}) => {
  let retrievedData = location.state;

  var beerAttributes = Object.keys(retrievedData).map((key, index) => {
    return (
      <IonGrid key={index}>
        <IonRow className="row"><IonImg src={retrievedData[key].image_url} alt="IMAGE" className="image"></IonImg></IonRow>
        <IonRow className="row"><IonText className="title" color="tertiary">{retrievedData[key].name + " (" + retrievedData[key].first_brewed + ")"}</IonText></IonRow>
        <IonRow className="row">{retrievedData[key].description}</IonRow>
        <IonRow className="row center">
          <IonCol className="borders"><IonText color="secondary">Degré</IonText></IonCol>
          <IonCol className="borders">{retrievedData[key].abv}</IonCol>
        </IonRow>
        <IonRow className="row center">
          <IonCol className="borders"><IonText color="secondary">Couleur (EBC)</IonText></IonCol>
          <IonCol className="borders">{retrievedData[key].ebc}</IonCol>
        </IonRow>
        <IonRow className="row center">
          <IonCol className="borders"><IonText color="secondary">Couleur (SRM)</IonText></IonCol>
          <IonCol className="borders">{retrievedData[key].srm}</IonCol>
        </IonRow>
        <IonRow className="row center">
          <IonCol className="borders"><IonText color="secondary">Amertume (IBU)</IonText></IonCol>
          <IonCol className="borders">{retrievedData[key].ibu}</IonCol>
        </IonRow>
        <IonRow className="row center">
          <IonCol className="borders"><IonText color="secondary">pH</IonText></IonCol>
          <IonCol className="borders">{retrievedData[key].ph}</IonCol>
        </IonRow>
      </IonGrid>
    )
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home" />
            </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { 
          beerAttributes
        }
      </IonContent>
    </IonPage>
  );
};

export default ItemPage;