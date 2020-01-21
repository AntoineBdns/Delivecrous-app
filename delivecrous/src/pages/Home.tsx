import {IonAlert,IonList,IonModal,IonToast,IonItem,IonIcon,IonButton,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonInput, IonListHeader, IonImg, IonText } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import  { cart, close, add, trash, beer, book } from 'ionicons/icons';

import "./Home.css";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [cartList, setCartList] = useState(new Array<number>());
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [showAlertValidation, setAlertValidation] = useState(false);
  const [showToastValidation, setShowToastValidation] = useState(false);
  const [beerList, setBeerList] = useState(new Array<any>());

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
    .then(res => res.json())
    .then(
      (result) => {
        setBeerList(result)
      },
      (error) => {
        alert(error);
      }
    )
  }, [])
  

  function addItemToCart(id : number) {
    setCartList([...cartList, id]);
    setShowToastAdd(true);
  }

  function validateForm(){
    setAlertValidation(true);
  }

  function removeItemFromCart(id : number){
    setCartList(cartList.filter((it) => (it !== id)));
    var index = cartList.indexOf(id);
    delete cartList[index];
    setShowToastAdd(true);
  }

  var beerCards = beerList.map((beer) => {
    return (
      <IonCard key={beer.id} className="card">
        <IonList>
          <Link to={{
              pathname: `/plat/${beer.id}`,
              state: { beer: beer }
            }}>
            <IonItem detail>
              <IonLabel color="secondary" className="title">{beer.name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonImg src= {beer.image_url} alt={beer.name} className="img" />
            </IonItem>
          </Link>
          
          <IonCardContent className="content">
            <IonText className="description" >{beer.description}</IonText>
            
            <IonButton expand="full" slot="end" color="secondary" onClick={ () => addItemToCart(beer.id)}>
              <IonIcon icon={add} slot="start"></IonIcon>
              <IonLabel>Ajouter</IonLabel>
            </IonButton>
          </IonCardContent>
        </IonList>        
      </IonCard>
    )
  });

  //Affiche la liste des items dans le pannier
  var cartCards = cartList.map((id) => {
    var name = null;
    var price = null;
    beerList.forEach((s) => {
      if(s.id === id){
         name = s.name;
         price = s.price;
      }
    });
   
    return (
      <IonItem key={id} className="cartItem">
        <IonLabel className="name">{name}</IonLabel>
        <IonLabel className="price">{price}</IonLabel>
        <IonButton fill="default" onClick={ () => removeItemFromCart(id)}><IonIcon icon={trash} slot="icon-only" color="danger"></IonIcon></IonButton>
      </IonItem>
    )
  });

  //Affiche le contenu da la page
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Delivecrous</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => setShowModal(true)}>
              <IonIcon slot="icon-only" color="light" icon={cart}/>
          </IonButton>
        </IonToolbar>
      </IonHeader>   
      <IonContent>
        <IonItem class="home-title" color="secondary">
          <IonLabel>La carte</IonLabel>
          <IonIcon icon={book} slot="end"></IonIcon>
        </IonItem>
        
        { beerCards }
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Panier</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)}>
                  <IonIcon slot="icon-only" color="light" icon={close}/>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonCard>
              <IonList>
                <IonListHeader>Liste des produits</IonListHeader>
                {
                (cartList.length>0)? cartCards : 
                  <IonItem>
                    <IonLabel className="emptyCartMessage">T'es sûr que tu veux rien ?</IonLabel>
                    <IonIcon icon={beer} slot="end" color="secondary"></IonIcon>
                  </IonItem>
                }
              </IonList>
            </IonCard>
            <IonCard>
              <IonCardHeader>Livraison</IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Rue : </IonLabel>
                  <IonInput type="text" placeholder="4 rue de la Victoire"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Ville : </IonLabel>
                  <IonInput type="text" placeholder="Valenciennes"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Code Postal : </IonLabel>
                  <IonInput type="number" placeholder="59300"></IonInput>
                </IonItem>
                <IonButton expand="block" color="success" disabled={cartList.length<=0} onClick={() => validateForm()}>
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
                setCartList(new Array<number>());
                setShowToastValidation(true);
              }
            }
          ]}
        />
    </IonPage>
  );
};

export default Home;