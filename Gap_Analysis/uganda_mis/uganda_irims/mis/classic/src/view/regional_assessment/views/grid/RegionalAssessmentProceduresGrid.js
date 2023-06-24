Ext.define('Admin.view.regional_assessment.views.grid.RegionalAssessmentProceduresGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'regionalassessmentproceduresGrid',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'regionalassessmentsetupvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '50%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],

    selModel:{
        selType: 'checkboxmodel',
        mode: 'SINGLE'
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
                storeId: 'regionalassessmentproceduresStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                        table_name: 'par_assessment_procedures'
                    }
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var grid = this,
                panel = grid.up('panel'),
                assessment_procedure_id = record.get('id'),
                country_grid = Ext.ComponentQuery.query("#assessmentcountrygridRef")[0],
                store = country_grid.getStore();

                country_grid.down('hiddenfield[name=assessment_procedure_id]').setValue(assessment_procedure_id);
               

            store.load({params:{'assessment_procedure_id':assessment_procedure_id}});
    
         }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'id',
        hidden: true,
        text: 'Assessment Procedure ID',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Assessment',
        flex: 1,
    }]
});
