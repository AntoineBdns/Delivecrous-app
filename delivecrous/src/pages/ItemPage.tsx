import React from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import  { arrowRoundBack } from 'ionicons/icons';


interface ItemPageProps extends RouteComponentProps<{
    id: string;
}> {}

const ItemPage: React.FC<ItemPageProps> = ({match}) => {
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
      </IonContent>
    </IonPage>
  );
};

export default ItemPage;