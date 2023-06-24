 Ext.define('Admin.view.frontoffice.survelliance.grids.SurvelliancePmsIngredientsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
   xtype: 'survelliancepmsingredientsview',
   layout: 'fit',
   listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'survelliancepmsingredientsStr',
                proxy: {
                    url: 'surveillance/getPmsSampleIngredients'
                }
            },
            isLoad: false
        }
    },
    title: 'Sample Ingredients',
     viewConfig: {
            emptyText: 'No information found for the product Line under creteria'
        },
    columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'id',
            text: 'Ref ID',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'ingredient',
            text: 'Ingredient',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'specification',
            text: 'Specification',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'strength_txt',
            text: 'Strength',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'inclusion_reason',
            text: 'Inclusion Reason',
            flex: 1
        }]


  });