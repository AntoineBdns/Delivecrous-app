import React from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonImg, IonText, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './ItemPage.css';


interface ItemPageProps extends RouteComponentProps<{
    id: string,
    beer: any
}> {}

const ItemPage: React.FC<ItemPageProps> = ({match, location}) => {
  let retrievedData = location.state;
  console.log("DATA", retrievedData)

  var beerAttributes = Object.keys(retrievedData).map(key => {
    return (
      <IonGrid>
        <IonRow className="row"><IonImg src={retrievedData[key].image_url} alt="IMAGE" className="image"></IonImg></IonRow>
        <IonRow className="row"><IonText color="tertiary" className="title">{retrievedData[key].name + " (" + retrievedData[key].first_brewed + ")"}</IonText></IonRow>
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
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home" />
            </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLabel>
            <h2>ID : {match.params.id}</h2>
        </IonLabel>
        { 
          beerAttributes
        }
      </IonContent>
    </IonPage>
  );
};

export default ItemPage;