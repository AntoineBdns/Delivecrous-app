import { IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonToast, IonModal } from '@ionic/react';
import React from 'react';
import  { cart, close } from 'ionicons/icons';
import "./Home.css";
import data from "../data.json";


export default class Welcome extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
      this.state = {
        showModal: false,
        showToastAdd: false,
        showAlertValidation: false,
        showToastValidation: false,
        beerList: data.shopList,
        cartList: []
      }  
    }

    addItemToCart(id : number) {
        let cartItems = [...this.state.cartList, id];
        this.setState({cartList: cartItems});
    }

    setShowToastAdd(value : boolean) {
        this.setState({showToastAdd: value})
    }

    setShowModal(value : boolean) {
        this.setState({showModal: value})
    }

    renderBeerCards() {
        this.state.beerList.map((beer: any) => {
            return (
            <IonCard key={beer.id} className="card" routerLink={`/plat/${beer.id}`} routerDirection="forward">
                <img src= {beer.img} alt={beer.name} />
                <IonCardHeader>
                <IonCardTitle className="title">{beer.name}</IonCardTitle>
                <IonCardSubtitle className="price">{beer.price}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className="content">
                {beer.desc}
                <IonButton expand="block" slot="end" onClick={ () => this.addItemToCart(beer.id)}>
                    Ajouter
                </IonButton>
                </IonCardContent>    
            </IonCard>
            )
        })
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Delivecrous</IonTitle>
                    <IonButton slot="end" onClick={() => this.setShowModal(true)}>
                        <IonIcon slot="icon-only" icon={cart}/>
                    </IonButton>
                    </IonToolbar>
                </IonHeader>   
                <IonContent className="ion-padding">
                    <IonLabel><h1>La carte</h1></IonLabel>
                    {
                        this.state.beerList.map((beer: any) => {
                            return (
                                <IonCard key={beer.id} className="card" routerLink={`/plat/${beer.id}`} routerDirection="forward">
                                    <img src= {beer.img} alt={beer.name} />
                                    <IonCardHeader>
                                    <IonCardTitle className="title">{beer.name}</IonCardTitle>
                                    <IonCardSubtitle className="price">{beer.price}</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent className="content">
                                    {beer.desc}
                                    <IonButton expand="block" slot="end" onClick={ () => this.addItemToCart(beer.id)}>
                                        Ajouter
                                    </IonButton>
                                    </IonCardContent>    
                                </IonCard>
                            )
                         })
                    }
                    <IonModal isOpen={this.state.showModal}>
                        <IonToolbar>
                            <IonTitle>Panier</IonTitle>
                            <IonButton slot="end" onClick={() => this.setShowModal(false)}>
                                <IonIcon slot="icon-only" icon={close}/>
                            </IonButton>
                        </IonToolbar>
                        <IonContent>
                            {
                                this.state.cartList.map((id : number) => {
                                    var name = null;
                                    var price = null;
                                    this.state.beerList.forEach((b : any) => {
                                      if(b.id === id){
                                        name = b.name;
                                        price = b.price;
                                      }  
                                    });
                                   
                                    return (
                                      <IonCard key="id" className="card">
                                        <IonCardHeader>
                                          <IonCardTitle className="title">{name}</IonCardTitle>
                                          <IonCardSubtitle className="price">{price}</IonCardSubtitle>
                                        </IonCardHeader>
                                      </IonCard>
                                    )
                                  })
                            }
                        </IonContent>      
                    </IonModal>
                </IonContent>
                <IonToast
                    isOpen={this.state.showToastAdd}
                    onDidDismiss={() => this.setShowToastAdd(false)}
                    message="C'est good"
                    cssClass="toastMessage"
                    position="bottom"
                    duration={500}
                />
            </IonPage> 
        )
    }

  }

  

