package classes;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HTTPClient {
    public static void main(String[] args) {
        try {
            // URL de la route du serveur Node.js
            String url = "http://localhost:3000/users";

            // Créer l'objet URL
            URL obj = new URL(url);

            // Ouvrir la connexion
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();

            // Définir la méthode de la requête (GET)
            con.setRequestMethod("GET");

            // Obtenir le code de réponse
            int responseCode = con.getResponseCode();
            System.out.println("Response Code : " + responseCode);

            // Lire la réponse
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Imprimer la réponse
            System.out.println("Response : " + response.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
