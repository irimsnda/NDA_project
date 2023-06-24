/**
 * Created by Kip on 11/1/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.QueryResponsesGenGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.new.FoodPremScreeningGrid',
    xtype: 'queryresponsesgengrid',
    controller: 'premiseregistrationvctr',
    frame: true,
    height: 550,
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Checklist',
        labelWidth: 150,
        margin: 3,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_checklist',
        queryMode: 'local',
        width: 500,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getProcessApplicableChecklistTypes'
                    }
                },
                isLoad: false
            },
            afterrender: function () {
                var grid = this.up('grid'),
                    store = this.getStore(),
                    application_status_id = grid.down('hiddenfield[name=application_status_id]').getValue(),
                    process_id = grid.down('hiddenfield[name=process_id]').getValue(),
                    workflow_stage_id = 1;
                if (application_status_id == 3) {

                }
                store.removeAll();
                store.load({
                    params: {
                        process_id: process_id,
                        workflow_stage: workflow_stage_id
                    }
                });
            },
            change: function () {
                var grid = this.up('grid'),
                    store = grid.getStore();
                store.load();
            }
        },
        labelStyle: "font-weight:bold"
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                checklist_type = grid.down('combo[name=applicable_checklist]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                checklist_type: checklist_type
            };
        }
    }]
});