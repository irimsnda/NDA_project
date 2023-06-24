/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.commoninterfaces.SampleAnalysisTestRequestsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampleanalysistestrequestspnl',
    name: 'sampleanalysistestrequestspnl',
    itemId: 'sampleanalysistestrequestspnl',
    layout: {
        type: 'fit'
    },
    height: 550,
    controller: 'commoninterfacesVctr',
    viewModel: 'commoninterfacesVm',
    defaults: {
        split: true
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'sample_application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'misproduct_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'zone_id'
    }, {
        xtype: 'hiddenfield',
        name: 'code_ref_no'
    },{
        xtype: 'hiddenfield',
        name: 'sample_id'
    },{
        xtype: 'hiddenfield',
        name: 'analysis_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }],
    items: [{
        xtype: 'sampleanalysistestrequestsgrid'
    }]
});