import React from 'react';
import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import  { arrowRoundBack } from 'ionicons/icons';


interface ItemPageProps extends RouteComponentProps<{
    id: string;
}> {}

const ItemPage: React.FC<ItemPageProps> = ({match, history}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButton color="light" fill="default" onClick={history.goBack} routerDirection="back"><IonIcon slot="icon-only" icon={arrowRoundBack}></IonIcon></IonButton>
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