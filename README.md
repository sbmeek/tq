<p align="center">
  <img src="https://avatars0.githubusercontent.com/t/3800248?s=280&v=4" title="TQ"/>
</p>
</br>

-Being developed by TQ Team. A SB-Meek's team.

# TQ (Idea ¿Versión beta?)
Aquí estaremos desglosando cada funcionalidad de la aplicación, para mayor entendimiento y uso de la misma, las definiciones estarán por orden de página:

### Página Principal
Esta cuenta con la opción de registro o inicio de sesión, por lo tanto, se encuentra un input en el cual se validará la información de registro o inicio, también cuenta con 3 botones cuya función es dirigir a la página que se le haya asignado, una vez el usuario sea creado con él usuario se crearan tres páginas únicas que son: **link**, **bandeja** y **mensajes anónimos de envió al usuario**.

### Aquí está cada botón de la página principal y su funcionalidad
**BANDEJA:** En este apartado se encontrará el buzón de mensajes anónimos, dichos mensajes cuentan con plantillas donde se puede escribir respuestas o comentarios acerca del mensaje, dicha plantilla puede ser cambiada, según se desee o guste dentro nuestro catálogo, esta página también ofrecerá la opción de eliminar usuario.

**CONTACTOS:** En este apartado estarán los medios de contactos de la empresa y también un buzón de bug, quejas, opiniones, para así tener una calificación exacta de las personas que usan dicha página.

**AYUDA:** En este apartado se encontrará el manual de ayuda, en el estará toda la información acerca del uso y restricción de la página.

### Autenticación
Cabe destacar que en este apartado se la validara la información proveniente del usuario, y para mayor entendimiento de este una vez se valide y pase a la siguiente página este recibirá una alerta diciendo que ha sido registrado temporalmente y que su cuenta automáticamente expirara cuando no le de un uso continuo, también aclarando que en la siguiente página podrá copiar un link con el cual podrá recibir mensajes anónimos una vez lo comparta en sus redes sociales. Una vez el usuario que acepte el aviso se accederá a la siguiente página: 

### Link (Pantalla)
Esta página cuenta con dos únicos botones y un slider promocional donde se le dice al usuario opciones de uso y funcionalidades. Los botones son los siguientes:

**COPIAR LINK:** Este botón te permite copiar un acceso a la página única de mensajes anónimos de envió al usuario, este acceso será compartido por el usuario en sus redes sociales para que así usuarios anónimos puedan acceder a dicha página y dejar el mensaje o pregunta deseada.

**BANDEJA:** Este botón definido anteriormente cuenta con un espacio en esta pagina para la satisfacción y mejor experiencia del usuario.

### Usuario Anónimo
Usuario anónimo cuenta con una única página con la cual únicamente se puede acceder por vía del link que el usuario principal comparta en sus redes sociales. Dicha página la llamaremos: **mensajes anónimos de envió al usuario**.

Esta pagina cuenta con un input cuya función es aceptar el mensaje o pregunta de usuario anónimo y enviarlo de forma directa al usuario dueño de dicha página única. Una vez el mensaje se ha enviado se le notificará al usuario anónimo que el envío fue satisfactorio y se limpiará la página para que así pueda volver a enviar un mensaje.<br/>

En caso de que un usuario anónimo envié mas de un mensaje se le adjuntara a la misma plantilla en la cual se adjuntó el primer mensaje de ese usuario, poniendo a disposición del usuario principal la opción de responder a su orden y a su gusto.  
Una vez el Usuario principal haya recibido el mensaje se le notificara en su barra de tareas que ha recibido un nuevo mensaje.<br/>

Esta página también contará con un aviso que afirme que todo es 100% anónimo y que su identidad esta 100% segura, por el mismo lugar advirtiendo que cualquier amanezca puede ser notificada a la ley por cualquier usuario principal.
También contara con la opción de ir a la página principal para registrarse y un mensaje que le motivara a hacerlo.<br/>

**EXPIRACIÓN:** Cada usuario contará cuenta con una fecha límite de expiración con el cual, si no accede dentro los parámetros puestos, la cuenta procederá a ser deshabilitada y el nombre de usuario quedará libre, para cualquier nuevo usuario que pueda utilizarlo.

**OJO:** Si el usuario expirado quisiera registrarse nuevamente con el mismo nombre, dependerá de que el nombre este disponible, de ser así serán restaurados sus mensajes y volverá a reactivarse su cuenta expirada, siempre y cuando sea desde el mismo dispositivo que se creó la primera vez.

**OJO2:** Esta opción solo está vigente para usuarios temporales, ya que en otras actualizaciones se implementarán cuentas avanzadas.

### FAQs

**¿Puedo utilizar TQ en cualquier dispositivo?**

Claro que si, TQ esta disponible en cualquier dispositivo Movil o desktop
Se debe de tener en cuenta que solo puedes iniciar sesión en el dispositivo en el cual te registraste, por lo cual debes de tener en cuenta que si solo lo utilizaras de paso, asegurarte de eliminar la cuenta en cuantos termines, ya que puedes poner en riesgo tu identidad y mensajes!

**¿Mi usuario tiene un límite de tiempo, aunque yo siempre entre?**

Actualmente tu usuario estará infinito mientras lo uses constantemente, pero si duras un limite de 4 dias tu cuenta pasara a estar expirada o inactiva.
En actualizaciones futuras podrás crearte una cuenta donde podrás iniciar sin problemas y de manera indefinida.


**¿Dónde se guardan mis mensajes y si estarán ahí indefinidamente mientras no expire mi usuario?**

Tu usuario guarda tus mensajes en una carpeta única para ti en nuestra base de datos donde estarán 100% seguros, POR TIEMPO LIMITADO.
Tus mensajes al igual que tu usuario tendrá una fecha de expiración que se actualizara cada vez que abras el mensaje, una vez un mensaje ya tenga un tiempo sin abrirse se mandara a la papelera de la base de datos y de ahí en 24 horas el mensaje quedara eliminado definitivamente.
OJO: si nunca has abierto el mensaje se quedará ahí hasta que lo abras, una vez abierto por primera vez se le asignara una fecha de expiración que se actualizara cada vez que abras el mensaje 

**COMPARTIDO:** Tus mensajes los podrás responder y borrar cuando quieras, podrá compartir tus respuestas atreves del enlace de compartir que tendrá la plantilla, así pudiendo subir tus mensajes y respuestas a las storys de tus redes sociales, para que el usuario anónimo que te dejo un mensaje o pregunta, vea tu respuesta y talvez te responda atreves de otro mensaje, ordenando los mensajes de forma que otras aplicaciones no pueden.

# Versiones

Utilizaremos [SemVer](https://semver.org), es decir el **versionado semántico**, pero ya que no se pretende implementar una API pública (ni ahora, ni en el futuro) **NO aplicaremos TODAS sus reglas al pie de la letra** ya que como se expresa en https://semver.org:

> I propose a simple set of rules and requirements that dictate how version numbers are assigned and incremented. These rules are based on but not necessarily limited to pre-existing widespread common practices in use in both closed and open-source software. For this system to work, you first need to declare a public API. This may consist of documentation or be enforced by the code itself. Regardless, it is important that this API be clear and precise. Once you identify your public API, you communicate changes to it with specific increments to your version number. Consider a version format of X.Y.Z (Major.Minor.Patch). Bug fixes not affecting the API increment the patch version, backwards compatible API additions/changes increment the minor version, and backwards incompatible API changes increment the major version.

Sin embargo, para llevar un control de los cambios realizados (entre otros motivos no listados, tales como **marketing**), se partirá desde este punto y/o versión **0.1.183**.

>**0** ya que ninguna versión ha salido a producción hasta este momento (2020-04-28T03:17:34.263Z). **1** y **183** tomando en cuenta todos los cambios que se realizaron en el antiguo repositorio (**0.1.183** como un punto inicial).

### En conclusión: X.Y.Z

<ul>
  <li>
    Si el nuevo lanzamiento es para solucionar un bug se incrementará el número <b>Z</b>.
  </li>
  <li>
    Si el nuevo lanzamiento contiene una nueva característica (por ejemplo, cuando copias el link en el "link-screen" se muestra una alerta con información relacionada) se incrementará el número <b>Y</b>. Cuando el número <b>Y</b> incrementa el número <b>Z</b> debe establecerse en 0, ya que la nueva característica "no contiene bugs".
  </li>
  <li>
    Si el nuevo lanzamiento contiene cambios que obligan al usuario a reaprender la forma en que se usa la aplicación y/o cambios de funcionalidades vitales para la aplicación (por ejemplo, cambios a la interfaz gráfica "UI", la forma en que se envían los mensajes, o la forma en que un usuario inicia sesión) se incrementará el número <b>X</b>.
  </li>
</ul>
