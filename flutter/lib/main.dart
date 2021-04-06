import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'package:odinbook/routes/HomePage.dart';

ValueNotifier<GraphQLClient> client;
String token = "";

void main() async {
  await initHiveForFlutter();

  final HttpLink httpLink = HttpLink(
    'http://localhost:5001/odinbook/us-central1/graphql',
  );

  final AuthLink authLink = AuthLink(
    getToken: () async => 'Bearer $token',
  );

  final Link link = authLink.concat(httpLink);

  client = ValueNotifier(
    GraphQLClient(
      link: link,
      cache: GraphQLCache(store: HiveStore()),
    ),
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
        client: client,
        child: MaterialApp(
          title: 'Odinbook',
          theme: ThemeData(
            // This is the theme of your application.
            //
            // Try running your application with "flutter run". You'll see the
            // application has a blue toolbar. Then, without quitting the app, try
            // changing the primarySwatch below to Colors.green and then invoke
            // "hot reload" (press "r" in the console where you ran "flutter run",
            // or simply save your changes to "hot reload" in a Flutter IDE).
            // Notice that the counter didn't reset back to zero; the application
            // is not restarted.
            primarySwatch: Colors.blue,
          ),
          home: MyHomePage(title: 'Odinbook'),
          routes: <String, WidgetBuilder>{
            '/about': (BuildContext context) {
              return Scaffold(
                appBar: AppBar(
                  title: const Text('About Route'),
                ),
              );
            }
          },
        ));
  }
}
