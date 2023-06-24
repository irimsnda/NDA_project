/**
 * Created by softclans
 */
Ext.define('Admin.view.configurations.views.grids.ResearchOrgsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'researchOrgsGrid',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
            xtype: 'button',
            bind: {
                disabled: '{isReadOnly}'
            },
            text: 'Add To List',
            iconCls: 'x-fa fa-plus',
            action: 'add',
            ui: 'soft-green',
            childXtype: 'researchOrgsFrm',
            winTitle: 'Add Research Organization',
            winWidth: '40%',
            handler: 'showAddConfigParamWinFrm',
            stores: '[]'
        },'->',{
            xtype: 'hiddenfield',
            name: 'callerRef'
        },{
            xtype: 'textfield',
            name: 'research_name',
            emptyText: 'Search by name'
        },{
            xtype: 'button',
            text: 'Search',
            ui: 'soft-green',
            handler: function(btn){
                btn.up('grid').getStore().load();
            }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(me){
            var store = this.getStore(),
                grid = this.up('grid'),
                research_name = grid.down('textfield[name=research_name]').getValue();
            store.getProxy().extraParams = {
                research_name: research_name,
                table_name: 'par_clinical_researchorganisations'
            }
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'researchOrgsGridStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable'
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadSelectedResearchOrgnization'
    },
    
    columns: [{
        dataIndex:'name',
        text:'Name',
        flex:1

    },{
        dataIndex:'country_name',
        text:'Country',
        flex:1

    },{
        dataIndex:'region_name',
        text:'Region',
        flex:1

    },{
        dataIndex:'physical_address',
        text:'Physical Address',
        flex:1

    } ,{
        dataIndex:'postal_address',
        text:'Postal Address',
        flex:1
    }   ,{
        dataIndex:'email',
        text:'Email',
        flex:1
    },{
        dataIndex: 'telephone_no',
        text: 'Telephone',
        flex: 1
    }    
]
   
});