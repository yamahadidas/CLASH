# Armando un ATAQUE

Ahora que ya vimos el como interactuan y se desarrolla un turno de CLASH, veremos como funcionan, de forma adecuada, los ATAQUES de el sistema.

Primero, veremos esta tabla:

| N° de Acciones | Dados |
| -------------- | ----- |
| 1              | 1d20  |
| 2              | 1d12  |
| 3              | 1d8   |
| 4              | 1d6   |

El como funcionan los ATAQUES y acciones de CLASH es sencillo. Dependiendo de el número de acciones declaradas en el ATAQUE, se le asigna un mismo dado a cada acción. Luego, se le suma al dado acorde el modificador apropiado dependiendo de la acción. En el flujo de combate usual, los modificadores pertinentes son estos:

| Acción                  | Modificador                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Ofensiva / Contraataque | (Físico o Reflejos)² + Bonos aplicables (Armas, Aumentos, Prótesis, Pasivas, Rasgos)      |
| Defensiva               | (Resistencia o Reflejos)² + Bonos aplicables (Armas, Aumentos, Prótesis, Pasivas, Rasgos) |

Y dependiendo de la cantidad de acciones declaradas, el modificador es dividido por la cantidad. Viendo un ejemplo:

* Un PC de los siguientes stats, con un arma de bonus +0: 
	* F (4), P (3), T (1), J (1)
* Declara el siguiente ataque:
	* 1 Corte, 1 Evasión, 1 Corte

Entonces el tirar los dados para cada acción cuando corresponda se vería así, asumiendo que su ataque principal utiliza Físico como su skill de preferencia para atacar:

* (1d8 + (Atk. Mod / N), (1d8 + Reflex Mod / N), (1d8 + Atk. Mod / N).

Reemplazando...

* (1d8 + 16/3), (1d8 + 1/3), (1d8 + 16/3)

Y con eso tenemos un ATAQUE declarado, con los números establecidos. 

![104](attack_ex1.png)
![](attack_ex2.png)
*Ejemplo de un ATAQUE declarado.*

Una vez tengamos ESO decidido, se lanza un último 1d4. Este 1d4 dictará que tanto E.E se infligirá con esta acción, ocupando la siguiente fórmula.

* 1d4 + (Enfoque) 

El valor obtenido se repartirá alrededor de todas las acciones que se tengan, con el jugador decidiendo si la acción infligirá Cuenta o Potencia en cada uno. 

## ATAQUES Inmodificables

Dependiendo de el tipo de personaje que hayas armado, existen ATAQUES inmodificables, los cuales tienden a ser poderosos o tener un nicho / uso específico. Estos se consiguen a través de una campaña. Por ejemplo, el más inmediatamente notable es el ataque insignia de agentes de W. Corp: **Desgarro Espacial**, el cuál funciona con el arquetipo **Carga** y ocupa todas sus Cuenta de Carga, siendo un devastador ataque de **5 Cortes** con modificadores altos para cada uno de estos. Estos son dictados por el GM antes de tiempo, y no pueden ser modificados de forma directa. 

Generalmente tienen una condición para poder ser accedidos en combate.

![](ripspace.png)
*Ejemplo de un ATAQUE Inmodificable, utilizando Rip Space de Library of Ruina. Asumir que se traducirá a las mecánicas de CLASH.*