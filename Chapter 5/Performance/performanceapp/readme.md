> ## Requerimentos:
<br>

* ### react-devtools:

        yarn add global react-devtools


* ### lodash:

        yarn add lodash 
        yarn add @types/lodash -D


* ### react-native-bundle-visualizer

        yarn add react-native-bundle-visualizer -D

        yarn run react-native-bundle-visualizer

> ## Opcional:
<br>

* ### source-map-explorer:

        yarn add global source-map-explorer

> ### memo

* Quando é muito grande

* Quando é um componente puro, ou seja só exibe, não há nenhuma regra

> ### useMemo

* Se o calculo ja existe ele não irá recalcular.


> ### useCallback

* Treeing Props/Function

* Quando passa uma função de pai para um filho que vai passar para outro filho...
Pai > Filho > Filho do Filho

<hr>

##### A função será alocada para mais de um espaço na memória ou será realocada para outro espaço.
<br>

##### useCallback => Não muda a alocação da função na memoria.

<hr>
<br>

 > ### Evitar fazer cálculos dentro do ciclo de vida do react/component

* Fazer cálculos nas functions antes do return/ciclo de vida.

* Não usar o index como key, pois se houver uma reordenação ou deslocar um item de lugar irá afetar a propriedade do item e resultará em uma nova renderização

* Formatar/Tratar os dados antes de passar para a interface


> ### FlatList Vs ScrollView

* FlatList: Calcula o que está no campo de visão.

* ScrollView: Renderiza tudo.