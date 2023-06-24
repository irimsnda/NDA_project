Ext.define('Admin.view.regional_assessment.views.grid.GMPAssessmentCountryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gmpassessmentcountrygrid',
    itemId: 'gmpassessmentcountrygridRef',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'regionalassessmentsetupvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '50%',

    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                assessment_procedure_id = grid.down('hiddenfield[name=assessment_procedure_id]').getValue(),
                category = pnl.down('hiddenfield[name=category]').getValue(),
                store = grid.getStore();

         store.getProxy().extraParams = {
                    assessment_procedure_id:assessment_procedure_id,
                    category:category
                }      
            
        },
     },'->',{
        xtype: 'button',
        text: 'Sync',
        width: 100,
        action: 'sync',
        disabled: true,
        ui: 'soft-purple',
        handler: 'syncProceduretoCountry'
    },{
        xtype: 'hiddenfield',
        name: 'assessment_procedure_id'
    }
    ],

    selModel:{
        selType: 'checkboxmodel'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        startCollapsed: true
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'assessmentcountryStr',
                proxy: {
                    url: 'configurations/getCountryMappedProcedures',
                }
            },
            isLoad: false
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[action=sync]').setDisabled(false);
            }
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
                
                
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                 
                    var rowIndex = store.indexOf(record);
                    if (record.data.is_mapped > 0 ) {
                        sm.select(rowIndex, true);
                    }
                });
            })
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[action=sync]').setDisabled(true);
            }
        }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'country_id',
        hidden: true,
        text: 'country_id',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1,
    }]
    
});
