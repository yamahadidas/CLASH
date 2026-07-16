# El Flujo

## Turnos

Un combate inicia en cualquiera de las siguientes situaciones:

* Dos o más entidades  distintas(individuales o grupales) se preparan para combatir entre ellas, con combate siendo inevitable y ambos sabiendo lo que se viene. Esto se puede entender con contexto adecuado y es lo más probable y simple. 
* Una entidad inicia un ataque contra la otra, incluso cuando esta otra no está atenta al ataque. En caso de sobrevivir este ataque inicial, se inicia el combate. 

Una vez se inicie el combate mismo, empezará un *turno*. 

## Fase de Declaración

Primero empieza la fase conocida como **Fase de Declaración**. En esta fase, todas las entidades que están en combate lanzan un dado para determinar su velocidad. Los valores de aliados se conocen entre ellos, los de enemigos son privados para el GM. 

La formula de velocidad es:

* 1d4 + (Reflejos + Físico)

![](speeddie.png)

Luego que las velocidades sean establecidas, el GM declarará (de forma privada) los ataques/acciones de las entidades que maneja, y una vez declare el GM, declararan ataques/acciones los jugadores. En esta fase es donde se hacen checks de:

* Intuición (para descubrir información acerca del enemigo, como pueden ser las velocidades, a quien declaró ataque una entidad, y que cantidad de acciones tiene este ataque.)
* Comprensión (para motivos similares a Intuición, pero con desventaja en los primeros 3 turnos.)
* Otras (para motivos varios mas contextuales y menos generales, más relacionados con el entorno o los motivos que llevaron al combate.)

Aquellos que tengan baja Intuición o hallan fallado el check del mismo o Comprensión declararán acciones primero, actuando de forma ciega y sin información proveída por el GM. Una vez hayan declarado, los jugadores que hayan tenido sus checks exitosos recibirán información pertinente, uno por uno, cada jugador con su propia pieza de información para que no se interfieran el uno con el otro.

A niveles más altos de Intuición y Convicción es posible lograr que personajes de baja Intuición / Comprensión puedan actuar con la información pertinente sin que trabajen de forma ciega.

Antes de proseguir:

### ¿Qué es un ATAQUE?

Un ATAQUE es un conjunto de acciones, generalmente con un rango de 1 a 4, con muy, muy pocos de estos teniendo más de 4. Estas acciones son:

* Ofensivas:  Corte, Contusión, y Perforante, las cuales son tipos de daño. 
* Defensivas: Evadir, Defender, Contraataque.

![](icons.png)

Ofensivas son ataques que uno realiza con su arma o cuerpo, y generalmente inflige el E.E característico del personaje.

Defensivas son acciones que uno realiza para evitar o disminuir posible daño. Tienen distintas particularidades:

* Evasión permite, en un CLASH, evitar completamente cualquier tipo de daño siempre que el valor que se consiga al tirar dados sea mayor que el ataque del enemigo. Siempre que una Evasión no pierda un CLASH, se mantendrá en reserva para esquivar otro ataque por el turno. El ganar con Evasión también te restaura tu Stagger Bar por el valor conseguido.
* Defender permite, en un CLASH, bloquear y mitigar daño. Si el número conseguido es mayor al del atacante, se bloquea por completo la acción enemiga e inflige daño a su Stagger Bar. Si pierde el CLASH, entonces se mitiga el daño por el valor conseguido.
* Contraataque permite que, en un CLASH, el ataque de el enemigo entre por completo sin oposición. Una vez el ataque del enemigo termine, se ejecutará un ataque en contra del enemigo, el cual usualmente entrará sin oposición.
  
Para describir un ATAQUE con múltiples acciones, se escribe:

* 3 Corte (con el número aumentando para describir un ataque con multiples acciones iguales consecutivas)
* 1 Corte, 1 Evasión, 1 Corte (cuando son acciones distintas. Incluso si hay dos acciones Corte, el que haya una Evasión entremedio hace que se anote acorde.)

Mientras menos acciones por turno, más potente será el valor conseguido con dados. Mientras más acciones, menos potente serán los valores conseguidos.

Aquí es donde el CLASH viene en juego: dependiendo de 2 factores, se inicia un CLASH:

* Si uno tiene mayor velocidad que el objetivo (mayor, no igual), interceptará cualquier ataque que este haya intentado hacer y lo forzará a entrar en un CLASH con el personaje.
* Si uno es el objetivo de un ataque, y se declara acciones al mismo que declaró dicho ataque, se entra en un CLASH. 

Hay más factores en juego, como que una declaración con CLASH hecha después que alguien mas haya declarado CLASH contra la misma entidad hará que el último en hacer la declaración tenga prioridad para el mismo, y que cada entidad única puede tener más de

Una vez todos hayan declarado que harán este turno, se termina la **Fase de Declaración.**

## Fase de SANIDAD

![](sanity.png)

Aquí es donde todas las entidades hacen tiros de **Sanidad** para ver si tendrán ventaja o desventaja este turno.

La fórmula para tener un tiro exitoso de **Sanidad** depende de la cantidad de **SP**. Para determinar **que rango de valores necesitas para ganar el tiro, se ocupa la siguiente fórmula:**

* 11 - (SP/5)

Que suena complicado, pero funciona acorde a la siguiente tabla como referencia:

| SP  | Valor Objetivo (d20>) |
| --- | --------------------- |
| +45 | 2                     |
| +30 | 5                     |
| +15 | 8                     |
| 0   | 11                    |
| -15 | 14                    |
| -30 | 17                    |
| -45 | 20                    |
Dejando el tener un 0 SP (el valor que todas las entidades comparten al inicio del combate) como un 50/50 de ventaja o desventaja.

Para referencia, este es la tabla de sanidad por niveles de calma.

| Calma | SP Ganado (acción positiva) | SP Perdido (acción negativa) |
| ----- | --------------------------- | ---------------------------- |
| 1     | +2                          | -6                           |
| 2     | +3                          | -5                           |
| 3     | +4                          | -4                           |
| 4     | +5                          | -3                           |
| 5     | +6                          | -2                           |
| 6     | +7                          | -1                           |
| EX    | +9                          | -1                           |

## Fase de CLASH

![](Light%20Defense.png)

Aquí es cuando el turno se ejecuta como tal y el tiempo avanza. Los turnos duran, en tiempo de juego, alrededor de 3 a 6 segundos.

Todas las declaraciones de ataque u otras acciones se ejecutan, y las entidades atacantes cargan al frente. 

Si la declaración de ataque NO esta en CLASH:

* El ATAQUE se considera SIN OPOSICIÓN, y se tiraran dados por cada una de las acciones dentro de el ATAQUE. Las acciones defensivas son acumuladas de fondo para ser usadas si alguien ataca a la entidad SIN OPOSICIÓN.

Si no es el caso, se inicia un CLASH.

Se enfrentarán el ataque de las dos entidades unas con la otra y se competirá para ver cuantos acciones se pueden confrontar, con cualquier otra acción restante entrando sin oposición.

Por ejemplo:

¡SE INICIA CLASH!:

* PC utiliza un ATAQUE de 3 acciones (3 Corte), ENEMIGO utiliza un ataque de 2 acciones (2 Contusión).
* Se enfrenta la 1°era acción de cada ATAQUE, lanzándose los dados para cada una.
* 15 (PC) v/s 13 (ENEMIGO). PC gana este clash.
* La acción de el enemigo es bloqueada, y en cambio entran 15 de daño de parte de PC. 
* Se enfrenta la 2°da acción de cada ATAQUE, lanzándose los dados para cada una.
* 13 (PC) v/s 15 (ENEMIGO). ENEMIGO gana este clash.
* La acción de el jugador es bloqueada, y en cambio entran 15 de daño de parte del ENEMIGO.
* Se enfrenta la 3°ra acción de cada ATAQUE, lanzándose los dados para cada una.
* Como ENEMIGO utilizo un ATAQUE de 2 acciones, no tiene 3°ra acción para el clash. LA 3°ra ACCIÓN DE PJ ENTRA SIN OPOSICIÓN.
* 15 (PC).
* PC inflige sin oposición 15 de daño a ENEMIGO.

Transcurre esto con todos los CLASHES que se declararon en la anterior fase, creando una sensación de caos en el campo de batalla. Una vez se resuelven los ataques y acciones de todos, se pasa a una breve fase de **Post-Combate**, para realizar breves movimientos y donde ciertas pasivas / efectos toman lugar.  Una vez terminado esto, se termina el turno, y se avanza al siguiente.

El combate seguirá por estas fases hasta que no hayan mas entidades hostiles en el area.



 
