import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AvatarUpload } from '@/components/settings/AvatarUpload';
import { ChangePassword } from '@/components/settings/ChangePassword';
import { NotificationPreferences } from '@/components/settings/NotificationPreferences';
import { useKeyboardShortcuts } from '@/components/keyboard/KeyboardShortcutsProvider';
import { Switch } from '@/components/ui/switch';
import { User, Loader2, Keyboard } from 'lucide-react';
import { toast } from 'sonner';
import { TypingText } from '@/components/ui/typing-text';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function KeyboardShortcutsSection() {
  const { enabled, setEnabled, showHelp } = useKeyboardShortcuts();
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Keyboard size={16} className="text-muted-foreground" />
        <h2 className="font-heading font-semibold text-lg text-foreground">Keyboard Shortcuts</h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Enable keyboard shortcuts</Label>
          <p className="text-xs text-muted-foreground">Use single-key shortcuts for navigation and actions</p>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      <button
        onClick={showHelp}
        className="mt-3 text-xs text-primary hover:underline"
      >
        View all shortcuts →
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName } });
      if (authError) throw authError;
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('user_id', user.id);
      if (profileError) throw profileError;

      await queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
      toast.success('Profile updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            <TypingText text="Settings" />
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="space-y-6 stagger">
          {/* Profile Section */}
          <div className="glass-card rounded-xl p-6 animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <User size={16} className="text-muted-foreground" />
              <h2 className="font-heading font-semibold text-lg text-foreground">Profile</h2>
            </div>

            {loadingProfile ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-primary/40" size={24} />
              </div>
            ) : (
              <div className="space-y-6">
                <AvatarUpload
                  avatarUrl={avatarUrl}
                  fullName={fullName}
                  onUploaded={(url) => {
                    setAvatarUrl(url);
                    queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
                  }}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="settings-email">Email</Label>
                    <Input id="settings-email" value={user?.email ?? ''} disabled className="bg-muted/50" />
                  </div>
                  <div>
                    <Label htmlFor="settings-name">Full Name</Label>
                    <Input
                      id="settings-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} disabled={saving} className="shadow-luxe">
                  {saving ? (
                    <><Loader2 size={14} className="animate-spin mr-2" /> Saving...</>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <ChangePassword />
          </div>

          {/* Notification Preferences */}
          <div className="glass-card rounded-xl p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <NotificationPreferences />
          </div>

          {/* Keyboard Shortcuts */}
          <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <KeyboardShortcutsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
