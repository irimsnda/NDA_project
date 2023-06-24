/**
 * Created by softclans
 */
Ext.define('Admin.view.pharmacovigilancereporting.forms.SafetyAlertReportsObservationsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'safetyalertreportsobservationsfrm',
    controller: 'pharmacovigilancevctr',
    itemId: 'safetyalertreportsobservationsfrm',
    frame: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 1,
    defaults: {
        margin: 5,
        columnWidth: 1,
        allowBlank: false
    },
    items: [ {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
          xtype:'hiddenfield',
          name:'application_code'  
            
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Safety Alert Category ',
            name: 'safetyalert_category_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_safetyalert_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textarea',
            fieldLabel: 'Safety Alert',
            name:'safety_alert'
            
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Safety Alert Observations',
            name: 'safety_alert_observation',
            columnWidth: 1,
            allowBlank: false
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Safety Alert Recommendation',
            name: 'safetyalert_recommendation_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_safetyalert_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->',
                {
                    xtype: 'button',
                    text: 'Save and Proceed',
                    ui: 'soft-purple',
                    nextStep: 1,
                    iconCls: 'x-fa fa-forward',
                    name: 'qry_tochecklist_btn',
                    formBind: true,
                    action: 'save_query',
                    action_url: 'pharmacovigilancereporting/saveSafetyAlertReportsObservations',
                    handler: 'saveSafetyAlertReportsObservations'
                }
            ]
        }
    ]
});