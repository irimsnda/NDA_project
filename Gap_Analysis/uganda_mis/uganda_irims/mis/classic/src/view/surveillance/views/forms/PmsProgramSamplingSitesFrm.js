/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramSamplingSitesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramsamplingsitesfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        labelAlign: 'top',
        columnWidth: 1
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'program_id'
        },{
            xtype: 'combo',
            fieldLabel: 'Select Sampling Level',
            margin: '0 20 20 0',
            name: 'site_level_id',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_site_levels'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'tagfield',
            fieldLabel: 'Select Sampling Site',
            margin: '0 20 20 0',
            store: 'businesstypesstr',
            name: 'sampling_site_ids',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',listeners: {
                beforerender: function () {
                    var store = this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
            
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/savePmsProgramSamplingSite',
            table_name: 'pms_program_samplingsites',
            storeID: 'pmsprogramsamplingsitessstr',
        }
    ]
});