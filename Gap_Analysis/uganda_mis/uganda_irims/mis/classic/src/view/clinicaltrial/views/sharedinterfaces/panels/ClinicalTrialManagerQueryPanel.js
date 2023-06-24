/**
 * Created by Kip on 6/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    itemId:'aplication_griddetails',
    xtype: 'clinicaltrialmanagerquerypanel',
    layout: 'fit',
    tbar:['->', {
        xtype: 'displayfield',
        name: 'process_name',
        fieldLabel: 'Process:-',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
            'margin-top': '-2px'
        }
    }, {
        xtype: 'tbseparator',
        hidden: true
    }, {
        xtype: 'displayfield',
        name: 'gmp_type_txt',
        hidden: true,
        fieldLabel: 'GMP Type',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
            'margin-top': '-2px'
        }
    }, {
        xtype: 'tbseparator'
    }, {
        xtype: 'displayfield',
        name: 'workflow_stage',
        fieldLabel: 'Workflow Stage:-',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
            'margin-top': '-2px'
        }
    }, {
        xtype: 'tbseparator',
        hidden: true
    }, {
        xtype: 'displayfield',
        name: 'application_status',
        hidden: true,
        fieldLabel: 'App Status',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
            'margin-top': '-2px'
        }
    }, {
        xtype: 'tbseparator',
        hidden: true
    },{
        xtype: 'displayfield',
        name: 'tracking_no',
        fieldLabel: 'Tracking No:',
        hidden: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
           // 'margin-top': '-2px'
        }
    }, {
        xtype: 'tbseparator',
        hidden: true
    }, {
        xtype: 'displayfield',
        name: 'reference_no',
        fieldLabel: 'Reference No:',
        hidden: true,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px',
          //  'margin-top': '-2px'
        }
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'active_application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'active_application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'application_status_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },{
        xtype: 'hiddenfield',
        name: 'manufacturing_site_id'
    }, {
        xtype: 'hiddenfield',
        name: 'applicant_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }
    ],
    items: [
        {
            xtype: 'clinicaltrialmanagerquerygrid'
        }
    ]//drugswithdrawalproductcommunication
});