# 🌱 Huella ecológica – App Expo React Native

Aplicación para calcular y visualizar la huella ecológica. Desarrollada con **React Native** usando **Expo**.

---

## 🚀 Cómo clonar y ejecutar este proyecto

### 1. Clonar el repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/Nob0dyknows99/huella-ecologica.git
cd huella-ecologica
```

---

### 2. Instalar dependencias

Asegúrate de tener instalado **Node.js** y luego ejecuta:

```bash
npm install
```

También puedes usar `yarn` si lo prefieres:

```bash
yarn install
```

---

### 4. Iniciar el proyecto con Expo

Usa el siguiente comando para iniciar el servidor con limpieza de caché y acceso universal:

```bash
npx expo start --clear --tunnel
```

Esto hará lo siguiente:

- 🧹 Limpia la caché del bundler
- 🌐 Usa modo **túnel** para que puedas ver la app desde cualquier red
- 📱 Abre Expo DevTools con un QR para escanear desde tu celular con **Expo Go**

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/client) instalado en tu celular
- (Opcional) [Expo CLI](https://docs.expo.dev/get-started/installation/)

Para instalar Expo CLI globalmente:

```bash
npm install -g expo-cli
```

---

## 📱 Ver la app en tu celular

1. Instala **Expo Go** desde App Store o Google Play.
2. Escanea el código QR que aparece al correr `npx expo start --tunnel`.

---

## 📦 Scripts útiles

```bash
npm start          # Inicia con modo LAN
npm run start:dev  # (si lo agregas) Usa --clear y --tunnel
npm run android    # Compila en emulador Android
npm run ios        # Compila en iOS (Mac con Xcode)
```

Puedes agregar esto al `package.json` si deseas:

```json
"scripts": {
  "start": "expo start",
  "start:dev": "expo start --clear --tunnel"
}
```

---

## 🛠️ Troubleshooting

- ¿Errores extraños? Prueba con `--clear`
- ¿Tu celular no se conecta? Usa `--tunnel`
- ¿Cambiaste de PC? Reinstala dependencias con `npm install`

---

## 📝 Licencia

Este proyecto es de uso personal/educativo. Puedes adaptarlo según tus necesidades.
