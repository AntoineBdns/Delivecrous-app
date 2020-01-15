import { IonIcon, IonAlert, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonToast, IonModal, IonItem, IonListHeader, IonList, IonInput } from '@ionic/react';
import React from 'react';
import  { cart, close } from 'ionicons/icons';
import "./Home.css";


export default class Home2 extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
      this.state = {
        showModal: false,
        showToastAdd: false,
        showAlertValidation: false,
        showToastValidation: false,
        beerList: [],
        cartList: []
      }  
      this.getDatas();

    }

    getDatas() {
        fetch("https://api.punkapi.com/v2/beers")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("API : ", result);
                this.setState({beerList: result})
            },
            (error) => {
                alert(error);
            }
        );
    }

    addItemToCart(id : number) {
        console.log(id)
        let cartItems = [...this.state.cartList, id];
        console.log("CART ITEMS : ", cartItems)
        console.log("CART LIST : ", this.state.cartList)
        this.setState({cartList: cartItems}, () => {console.log("CART LIST : ", this.state.cartList)});
        
        this.setShowToastAdd(true)
    }

    resetCart() {
        this.setState({cartList: []})
    }

    setShowToastAdd(value : boolean) {
        this.setState({showToastAdd: value})
    }

    setShowModal(value : boolean) {
        this.setState({showModal: value})
    }

    setShowToastValidation(value : boolean) {
        this.setState({showToastValidation: value})
    }

    setShowAlertValidation(value : boolean) {
        this.setState({showAlertValidation: value})
    }

    validateForm(){
        this.setShowAlertValidation(true);
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
                                    <img src= {beer.image_url} alt={beer.name} />
                                    <IonCardHeader>
                                    <IonCardTitle className="title">{beer.name}</IonCardTitle>
                                    <IonCardSubtitle className="price">4</IonCardSubtitle>
                                    </IonCardHeader>
                                    <IonCardContent className="content">
                                    {beer.description}
                                    <IonButton expand="block" slot="end" onClick={ (e) => {e.preventDefault(); this.addItemToCart(beer.id)}}>
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
                            <IonCard>
                                <IonList>
                                    <IonListHeader>Liste des produits</IonListHeader>
                                    {
                                        (this.state.cartList.lenght > 0) ? (
                                            this.state.cartList.map((id : number) => {
                                                var name = null;
                                                var price = null;
                                                this.state.beerList.forEach((s : any) => {
                                                if(s.id === id){
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
                                            })
                                        ) : <IonItem><IonLabel className="emptyCartMessage">Votre Panier est vide</IonLabel></IonItem>
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
                                    <IonButton expand="block" disabled={this.state.cartList.length<=0} onClick={() => this.validateForm()}>
                                        Passer Commande
                                    </IonButton>
                                </IonCardContent>
                                </IonCard>
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
                <IonToast
                    isOpen={this.state.showToastValidation}
                    onDidDismiss={() => this.setShowToastValidation(false)}
                    message="Commande envoyée"
                    cssClass="toastMessage"
                    position="bottom"
                    duration={1000}
                />
                <IonAlert
                    isOpen={this.state.showAlertValidation}
                    onDidDismiss={() => this.setShowAlertValidation(false)}
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
                            this.resetCart()
                            this.setShowToastValidation(true);
                        }
                        }
                    ]}
                    />
            </IonPage> 
        )
    }

  }

  

