package classes;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class HTTPClient {

    public HTTPClient(List<String> pathList) {
        try {
            pathList.forEach(path -> {
                try {
                    String response = getHttpResponse(path,3000);
                    System.out.println(path +" : " + response);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Fonction générique pour obtenir la réponse d'une requête HTTP GET
    public static String getHttpResponse(String object, int port) throws Exception {
        // Créer l'objet URL
        String strUrl = "http://localhost:" + Integer.toString(port) +"/" + object;
        URL url = new URL(strUrl);

        // Ouvrir la connexion
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        // Définir la méthode de la requête (GET)
        con.setRequestMethod("GET");

        // Obtenir le code de réponse
        int responseCode = con.getResponseCode();
        System.out.println("Response Code: " + responseCode);

        // Lire la réponse
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        // Retourner la réponse sous forme de chaîne de caractères
        return response.toString();
    }

    public static void main(String[] args) {
        ArrayList<String> pathList;
        new HTTPClient(pathList = new ArrayList<>(Arrays.asList("benches", "projects", "rooms", "users")));

    }

}


