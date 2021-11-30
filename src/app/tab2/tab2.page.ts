/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  encodedData: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  scannedBarCode: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  currentDate: string = new Date().toISOString().slice(0, 10);
  mensajito: string;
  labelBoton: string;
  userEntry: boolean;
  calculo: string;
  costeTotal: number;

  constructor(private scanner: BarcodeScanner) {
    this.encodedData = 'Escaneando QR en ucoGYM';
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  };

  ionViewDidEnter(){
    this.comprobarPresencia();
    this.consultarAforo();
    this.prepararVista();
  }

  consultarAforo() {
    const app = initializeApp(environment.firebase);
    const dbRef = ref(getDatabase(app));
    const referencia = get(child(dbRef, 'aforo/')).then((snapshot) => {
      if (snapshot.exists()) {
        const resultadoPeticion = snapshot.val();
        for (const fecha in resultadoPeticion){
          if (fecha === this.currentDate){
            window.localStorage.setItem('aforoActual', resultadoPeticion[fecha].aforoActual);
            return;
          }
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  comprobarPresencia(){
    const userEntryEnLocalStorage = window.localStorage.getItem('userEntry');
    if (userEntryEnLocalStorage){
      this.labelBoton = 'Registrar salida';
      this.userEntry = true;
    }
    else {
      this.labelBoton = 'Registrar entrada';
      this.userEntry = false;
    }
  }

  prepararVista(){
    this.mensajito = '';
    this.calculo = '';
    document.getElementById('imagen-exito').style.display = 'none';
    document.getElementById('imagen-fracaso').style.display = 'none';
    document.getElementById('coste-total').style.display = 'none';
    document.getElementById('boton-qr').style.display = 'block';
    document.getElementById('boton-qr').style.display = 'block';
  }

  scanBRcode() {
    this.scanner.scan().then(res => {
        this.scannedBarCode = res;
        if (this.scannedBarCode['text'] === 'accesoUcoGYMhegewjans'){
          const app = initializeApp(environment.firebase);
          const db = getDatabase(app);

          if (!this.userEntry){
            const fechaHoraActual = Date.now();
            set(ref(db, 'fichajes/' + window.localStorage.getItem('userUsername')), {
              horaEntrada: fechaHoraActual.toString(),
            });
            if (window.localStorage.getItem('aforoActual') == null) {
              set(ref(db, 'aforo/' + this.currentDate), {
                aforoActual: 1,
              });
            }
            else {
              set(ref(db, 'aforo/' + this.currentDate), {
                aforoActual: parseInt(window.localStorage.getItem('aforoActual'))+1,
              });
            }
            this.mensajito = '¡Entrada registrada!';
            document.getElementById('boton-qr').style.display = 'none';
            document.getElementById('imagen-exito').style.display = 'block';
            window.localStorage.setItem('userEntry', 'true');
          }
          else {
            this.mensajito = '¡Salida registrada!';
            document.getElementById('boton-qr').style.display = 'none';

            const dbRef = ref(db);
            const referencia = get(child(dbRef, 'fichajes/'+window.localStorage.getItem('userUsername'))).then((snapshot) => {
              if (snapshot.exists()) {
                const resultadoPeticion = snapshot.val();
                const fechaHoraEntrada = Number(resultadoPeticion.horaEntrada);
                const fechaHoraActual = Date.now();
                const segundos = (fechaHoraActual - fechaHoraEntrada) / 1000;
                const minutos = segundos / 60;
                const minutosRedondeados = Math.round((minutos + Number.EPSILON) * 100) / 100;

                this.calculo = `${minutosRedondeados} minutos x ${environment.precioMinuto} céntimos/min`;
                this.costeTotal = (minutosRedondeados * environment.precioMinuto) / 100;
              }
            }).catch((error) => {
              console.error(error);
            });

            set(ref(db, 'aforo/' + this.currentDate), {
              aforoActual: parseInt(window.localStorage.getItem('aforoActual'))-1,
            });

            document.getElementById('coste-total').style.display = 'block';
            window.localStorage.removeItem('userEntry');
          }
        }
        else {
          this.mensajito = '¡Ese QR no es de ucoGYM!';
          document.getElementById('imagen-fracaso').style.display = 'block';
          setTimeout(() => {
            document.getElementById('imagen-fracaso').style.display = 'none';
          },5000);
        }
      }).catch(err => {
        alert(err);
      });
  };

}
