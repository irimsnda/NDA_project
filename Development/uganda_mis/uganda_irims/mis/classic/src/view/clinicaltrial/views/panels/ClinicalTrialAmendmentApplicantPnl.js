/**
 * Created by Kip on 1/31/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialAmendmentApplicantPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialamendmentapplicantpnl',
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'top',
            margin: 3,
            items: [
                {
                    xtype: 'button',
                    text: 'Search Clinical Trial Application',
                    iconCls: 'x-fa fa-search',
                    handler: 'showAddClinicalTrialParamWinFrm',
                    childXtype: 'clinicaltrialsselectiongrid',
                    winTitle: 'Registered Clinical Trials',
                    action: 'search_application',
                    winWidth: '90%',
                    stores: '[]'
                },
                {
                    xtype: 'tbspacer',
                    width: 50
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    labelWidth: 50,
                    width: 400,
                    name: 'zone_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Zone'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    },
                    labelStyle: 'font-weight:bold'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'applicantdetailsfrm'
        }
    ]
});