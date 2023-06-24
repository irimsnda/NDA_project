/**
 * Created by Kip on 1/27/2019.
 */
Ext.define('Admin.store.parameters.TcRecommendationDecisionsStr', {
        extend: 'Ext.data.Store',
        alias: 'store.tcrecommendationdecisionsstr',
        storeId: 'tcrecommendationdecisionsstr',
        requires: [
            'Admin.model.parameters.ParametersMdl'
        ],
        model: 'Admin.model.parameters.ParametersMdl',
        autoLoad: false,
        defaultRootId: 'root',
        enablePaging: true,
        proxy: {
            type: 'ajax', 
            url: 'configurations/getNonrefParameter',
			extraParams: {
				table_name: 'par_tcmeeting_decisions'
			},
            headers: {
                'Authorization':'Bearer '+access_token
            },
            reader: {
                type: 'json',
                idProperty: 'id',
                rootProperty: 'results',
                messageProperty: 'message'
            }
        }
    });
