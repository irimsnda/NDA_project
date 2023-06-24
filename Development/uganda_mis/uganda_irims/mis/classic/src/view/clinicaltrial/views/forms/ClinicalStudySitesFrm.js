/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalStudySitesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicalstudysitesfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        margin: 3
    },
    items: [{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items:[{
                xtype: 'combo',
                name: 'study_site_id',
                fieldLabel: 'Study Site',
                queryMode: 'local',
                allowBlank: false,
                columnWidth: 0.8,
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 1000,
                            storeId:'studysitesstr',
                            proxy: {
                                url: 'clinicaltrial/getStudySitesList'
                            }
                        },
                        isLoad: true 
                    }
                }
            },{
                xtype: 'button',
                text: 'Add Study Site',
                columnWidth: 0.15,
                iconCls: 'x-fa fa-plus',
                ui: 'soft-green',
                name: 'add_study_site',
                childXtype: 'studysitefrm',
                winTitle: 'Study Site',
                winWidth: '70%'
            }]

        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype:'hiddenfield',
            name:'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            storeID: 'clinicaltrialstudysitesstr',
            handler: 'addApplicationStudySitestr'
        }
    ]
});