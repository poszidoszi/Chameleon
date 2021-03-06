# Dokumentáció

##Rendezvények szervezése

Készítette: Tóth Katalin

###1. Követelményanalízis
####1.1 Célkitűzés
A program célja, hogy érthetően, átláthatóan megjelenítse a felhasználóknak a rendezvényekhez kapcsolódó információkat: a rendezvények helyszínét, időpontját, a résztvevőket.
  
#####Funkcionális követelmények:
* Böngészés a rendezvények között
* Regisztráció
* Bejelentkezés
* Bejelentkezett felhasználók részére elérhető funkciók:
  - profiladatok szerkesztése
  - rendezvény létrehozása, módosítása, törlése
  - helyszín létrehozása, módosítása, törlése
  - rendezvényeken való részvétel
  - komment írása

####Nem funkcionális követelmények:
* Könnyű, letisztult áttekinthetőség: kategóriánkénti csoportosítás
* Ésszerű elrendezés, könnyen kezelhetőség
* Biztonságos működés: jelszavak tárolása, azok védelme

####1.2 Szakterületi fogalomjegyzés
**Rendezvények:** esemény, ami szórakoztató
**Résztvevő:** aki szórakozik
**Helyszín:** ahol szórakozunk

####1.3.	Használatieset-modell, funkcionális követelmények
**Vendég**: Csak a publikus oldalakat éri el:
*	Főoldal
*	Bejelentkezés
![](/docs/images/login.png)
*	Regisztráció

**Bejelentkezett felhasználó**: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
*	Új esemény felvétele
*	Meglévő esemény megtekintése, szerkesztése, törlése
*	Új helyszín felvétele
![](/docs/images/event.png)
*	Meglévő helyszín megtekintése, szerkesztése, törlése
* Jelentkezés rendezvényre
*	Komment írása


###2.	Tervezés
####2.1 Oldaltérkép

**Publikus:**
* Főoldal
  * Események böngészése
* Bejelentkezés
* Regisztráció

**Bejelentkezett:**
* Kilépés
* Profil szerkesztése
* Új esemény felvétele
* Új helyszín felvétele
* Listaoldal
  * Esemény törlése 
  * Esemény megtekintése
    * Komment hozzáfűzése
  * Helyszín törlése 
  * Helyszín megtekintése
  
####2.2 Végpontok

* GET/: főoldal
* GET/login: bejelentkező oldal
* POST/login: bejelentkező adatok felküldése
* GET/login/signup: regisztrációs oldal
* POST/login/signup: regisztrációs adatok felküldése
* GET/logout: kijelentkező oldal
* GET/events/list: eseménylista oldal
* GET/events/new: új esemény felvétele
* POST/events/new: új esemény felvételéhez szükséges adatok felküldése
* GET/events/id: esemény adatok
* POST/events/id: új megjegyzés felvitele
* GET/events/delete=id: esemény törlése
* GET/events/edit=id: esemény módosítása
* POST/events/edit=id: esemény módosítása, adatok felküldése
* GET/location/list: helyszín oldal
* GET/location/new: új helyszín felvétele
* POST/location/new: új helyszín felvételéhez szükséges adatok felküldése
* GET/location/id: helyszín adatok
* GET/location/delete=id: helyszín törlése
* GET/location/edit=id: helyszín módosítása
* POST/location/edit=id: helyszín módosítása, adatok felküldése

####2.3 Felhasználói-felület modell
#####2.3.1 Oldalvázlatok

**Főoldal**
![](/docs/images/mockup/index.png)

**Bejelentkező oldal**
![](/docs/images/mockup/login.png)

**Regisztrációs oldal**
![](/docs/images/mockup/signin.png)

**Esemény felvétele**
![](/docs/images/mockup/events_new.png)

**Helyszín felvétele**
![](/docs/images/mockup/loc_new.png)

**Esemény listaoldal**
![](/docs/images/mockup/events_list.png)

**Helyszín listaoldal**
![](/docs/images/mockup/locs.png)

**Esemény megtekintése**
![](/docs/images/mockup/events_details.png)

#####2.3.1 Designtervek
**Főoldal**
![](/docs/images/design/index.png)

**Bejelentkező oldal**
![](/docs/images/design/login.png)

**Regisztrációs oldal**
![](/docs/images/design/signin.png)

**Esemény felvétele**
![](/docs/images/design/events_new.png)

**Esemény listaoldal**
![](/docs/images/design/events_list.png)

**Helyszín listaoldal**
![](/docs/images/design/locs_list.png)

**Esemény megtekintése**
![](/docs/images/design/events_details.png)

###2.4 Felhasználói-felület modell
####2.4.1 Adatmodell és adatbázisterv
![](/docs/images/db.png)

###3. Implementáció
####3.1 Felkhasznált technológiák
- Git, Github
- NodeJs, AdonisJs
- Bootstrap
- Sublime Text

####3.2 Könyvtárstruktúra

* **Chameleon_gaf6rk**
  * **app**
    * **Http**
      * **controllers**
        * _EventController.js_
        * _LocationController.js_
        * _UserController.js_
      * _kernel.js_
      * _routes.js_
    * **Model**
      * _Comment.js_
      * _Event.js_
      * _Location.js_
      * _Token.js_
      * _User.js_
  * **config**
    * _app.js_
    * _auth.js_
    * _bodyParser.js_
    * _cors.js_
    * _databse.js_
    * _event.js_
    * _session.js_
    * _shield.js_
  * **database**
  * **resources/views**
    * **events**
      * _create.njk_
      * _details.njk_
      * _index.njk_
    * **locations**
      * _create.njk_
      * _index.njk_
      * _list.hbs_
    * **users**
      * _login.njk_
      * _registration.njk_
    * _master.hbs_
    * _welcome.hbs_
  * _package.json_
  * _server.js_

###4. Profiloldal

A regisztrált felhasználónak lehetősége van megtekinteni a profilját és ott szerkeszteni az adatait.

A megjelenő oldalon js segítségével történik a formkezelés. A formot vue.js technológiával kezeljük. A felhasználó a különböző tabokon szerkesztheti az adatait, módosíthatja jelszavát, illetve megtekintheti a saját eseményeinek listáját. A módosításokkor ajax-szal frissítjük az adatokat, illetve visszajelzünk a felhasználónak, hogy sikeres volt-e a módosítás.

###4. Tesztelés

Az alkalmazást funkcionálisan teszteljük a Selenium IDE segítségével.
