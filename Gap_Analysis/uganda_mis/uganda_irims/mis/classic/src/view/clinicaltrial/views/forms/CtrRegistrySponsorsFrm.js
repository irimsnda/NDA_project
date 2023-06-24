/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistrySponsorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistrysponsorsfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },{
                    xtype: 'hiddenfield',
                    name: 'sponsor_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_id'
                },
                
                {
                    xtype: 'hiddenfield',
                    name: 'isReadOnly'
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_btn',
                    childXtype: 'clinicaltrialpersonnelgrid',
                    winTitle: 'Clinical Trial Sponsor Selection List',
                    winWidth: '80%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'combo',
            name: 'sponsor_level_id',
            allowBlank: false,
            fieldLabel: 'Sponsor Level',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sponsors_levels'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        } ,{
            xtype: 'combo',
            name: 'sponsor_nature_id',
            allowBlank: false,
            fieldLabel: 'Nature of sponsor',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sponsors_nature'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/onsaveclinicaltSponsorDetails',
            table_name: 'tra_clinicaltrialregistry_sponsors',
            storeID: 'onlineclinicaltrialsponsorsgridstr',
        }
    ]
});